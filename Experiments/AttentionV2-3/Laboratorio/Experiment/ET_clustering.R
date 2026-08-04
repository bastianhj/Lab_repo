rm(list=ls())
library(viridis)
library(dplyr)
library(factoextra)
library(cluster)
library(grid)
library(png)
library(tidyr)
library(data.table)
library(tictoc)
library(jsonlite)
library(forcats)
library(knitr)
library(lme4)
#library(ggalluvial)
#install.packages("networkD3")
#library(networkD3)
#library(reshape2)
#install.packages('lme4')
#library(gganimate)
#library(riverplot)
#library(TraMineR)
#if (!require(circlize)) install.packages("circlize", dependencies = TRUE)
#library(circlize)


setwd('C:\\Users\\Seba\\Desktop\\TESIS 2024\\Experiment\\data\\AttentionV3-2')

files=list.files(pattern=".csv")

list_to_preserve <- c( 'Bus_cost', 'Bus_travel_time', 'Bus_Comfort', 'Bus_CO2', 'metro_cost', 'metro_travel_time', 'metro_Comfort',
                       'metro_CO2', 'RH_cost', 'RH_travel_time', 'RH_Comfort', 'RH_CO2', 'Trial', 'TrialDuration', 'ET_Bus_Label.numLooks', 'ET_Metro_Label.numLooks',
                       'ET_RH_Label.numLooks', 'ET_None_Label.numLooks', 'ET_Cost_Label.numLooks', 'ET_Time_Label.numLooks', 'ET_Comfort_Label.numLooks',
                       'ET_CO2_Label.numLooks', 'ET_Bus_Cost.numLooks', 'ET_Metro_Cost.numLooks', 'ET_RH_Cost.numLooks', 'ET_Bus_Time.numLooks', 'ET_Metro_Time.numLooks', 'ET_RH_Time.numLooks', 'ET_Bus_Comfort.numLooks',
                       'ET_Metro_Comfort.numLooks', 'ET_RH_Comfort.numLooks', 'ET_Bus_CO2.numLooks', 'ET_Metro_CO2.numLooks', 'ET_RH_CO2.numLooks', #numerics
                       'ETRECORD_FR', 'LEFTPUPIL_FR', 'RIGHTPUPIL_FR', 'TIME_GAZE', 'MOUSE_GAZE', 'attsize', 'prodsize', 'regETsize', 'Loc_Bus_label','Loc_Metro_label', 'Loc_RH_label', 'Loc_Cost_label', 'Loc_Travel_label', 'Loc_Comfort_label',
                       'Loc_CO2_label', 'Loc_Bus_cost', 'Loc_Metro_cost', 'Loc_RH_cost', 'Loc_Bus_travel', 'Loc_Metro_travel', 'Loc_RH_travel', 'Loc_Bus_comfort', 'Loc_Metro_comfort', 'Loc_RH_comfort', 'Loc_Bus_CO2', 'Loc_Metro_CO2',
                       'Loc_RH_CO2', 'Color_1', 'Loc_Color_1', 'Color_2', 'Loc_Color_2', 'Color_3', 'Loc_Color_3', 'Color_4', 'Loc_Color_4', 'ET_Bus_Label.timesOn',
                       'ET_Bus_Label.timesOff', 'ET_Metro_Label.timesOn', 'ET_Metro_Label.timesOff', 'ET_RH_Label.timesOn', 'ET_RH_Label.timesOff', 'ET_None_Label.timesOn', 'ET_None_Label.timesOff', 'ET_Cost_Label.timesOn', 'ET_Cost_Label.timesOff', 'ET_Time_Label.timesOn', 'ET_Time_Label.timesOff', 'ET_Comfort_Label.timesOn', 'ET_Comfort_Label.timesOff', 'ET_CO2_Label.timesOn', 'ET_CO2_Label.timesOff', 'ET_Bus_Cost.timesOn', 'ET_Bus_Cost.timesOff', 'ET_Metro_Cost.timesOn',
                       'ET_Metro_Cost.timesOff', 'ET_RH_Cost.timesOn', 'ET_RH_Cost.timesOff', 'ET_Bus_Time.timesOn', 'ET_Bus_Time.timesOff', 'ET_Metro_Time.timesOn', 'ET_Metro_Time.timesOff', 'ET_RH_Time.timesOn', 'ET_RH_Time.timesOff', 'ET_Bus_Comfort.timesOn', 'ET_Bus_Comfort.timesOff', 'ET_Metro_Comfort.timesOn', 'ET_Metro_Comfort.timesOff', 'ET_RH_Comfort.timesOn', 'ET_RH_Comfort.timesOff', 'ET_Bus_CO2.timesOn',
                       'ET_Bus_CO2.timesOff', 'ET_Metro_CO2.timesOn', 'ET_Metro_CO2.timesOff', 'ET_RH_CO2.timesOn', 'ET_RH_CO2.timesOff', #verctors
                       'mouse.clicked_name', 'Choice', 'participant' #characters, just not necessarily numeric
)

#extract and clean data------------------------------------------------------------------------
#data <- data.frame()
tic()
df <- rbindlist(lapply(files,function(archivo){
  data <-fread(archivo, select = list_to_preserve)
  data <- data[-c(1,.N),]
  return(data)
}), use.names=T, fill=T)
toc()

data <- df
dftest = df$ETRECORD_FR
start_lists = which(colnames(data) == "ETRECORD_FR")
mid_lists = which(colnames(data) == "ET_Bus_Label.timesOn")
ending_lists = which(colnames(data) == "ET_RH_CO2.timesOff")

#---------------------------------------------------------------------------
transform_columns <- function(df, startl, endingl) {
  for (i in startl:endingl) {
    df[[i]] <- gsub(" None", "nan", df[[i]])
    df[[i]] <- gsub("None", "nan", df[[i]])
    df[[i]] <- gsub(" nan", NaN, df[[i]])
    df[[i]] <- gsub("nan", NaN, df[[i]])
    # Convert to numeric: handle lists and split values
    df[[i]] <- sapply(df[[i]], function(x) {
      # Handle nested lists [[1,2],[3,4]]
      if (grepl("^\\[.*\\]$", x)) {
        x <- gsub("\\[", "list(", x)  # Change "[" to "c("
        x <- gsub("\\]", ")", x)      # Change "]" to ")"
        nums <- eval(parse(text = x))
#        nums <- unlist(nums, use.names = FALSE)
        nums[is.na(nums)] <- NA  # Handle NA conversion
        return(nums)  
      } 
      else if (grepl("^\\(.*\\)$", x)) {
        x <- gsub("\\(", "list(", x)  # Change "(" to "c("
        nums <- eval(parse(text = x))
#        nums <- unlist(nums, use.names = FALSE)
        nums[is.na(nums)] <- NA  # Handle NA conversion
        return(nums)  
      }
      return(NA)  # In case of unexpected format
    }, simplify = FALSE)  # Preserve list structure
    print(i)
  }
  return(df)
}
#---------------------------------------------------------------------------

#transforming lists
tic()
df <- transform_columns(data, start_lists, start_lists)
toc()

tic()
df <- transform_columns(data, mid_lists, ending_lists)
toc()

data <- df

#functions
data$numeric_choice<-NA
data$numeric_choice[-which(data$Choice=="")]<-as.numeric(factor(data$Choice[-which(data$Choice=="")]))
data<-data[!is.na(data$participant),]
data <- data %>% filter(TrialDuration > 0)
gaze_comp<-vector()
T=max(data$Trial,na.rm = TRUE)


##extract the position of labels
#data=labelpos(c('Loc_CO2_label','Loc_Comfort_label','Loc_Travel_label','Loc_Cost_label'))

atts <- c('_Cost', '_Time', '_Comfort', '_CO2', '_Label')
prods <- c('_Bus','_Metro','_RH')



#combinación prod x label
for (prod in prods) {
  for (att in atts) {
    # Construct dynamic column names based on `att`
    Var <- paste0( 'ET' , prod, att )
    col_timesOff <- paste0(Var, ".timesOff")
    col_timesOn <- paste0(Var, ".timesOn")
    new_col_name <- paste0(Var, "_TIME")  # New column name
    
    # Initialize the new column as NA
    df[[new_col_name]] <- NA
    
    # Loop through each row and apply the calculation
    for (i in 1:nrow(df)) {
      timesOff <- df[[col_timesOff]][[i]]  # Get the timesOff list for row i
      timesOn <- df[[col_timesOn]][[i]]    # Get the timesOn list for row i
      timesOff <- unlist(timesOff)
      timesOn <- unlist(timesOn)
      # Handle NULLs, NAs, and empty lists
      if (is.null(timesOff) || length(timesOff) == 0) timesOff <- numeric(0)
      if (is.null(timesOn) || length(timesOn) == 0) timesOn <- numeric(0)
      # Replace NA values inside the lists with 0 before summing (if needed)
      timesOff <- ifelse(is.na(timesOff) | is.nan(timesOff), 0, timesOff)
      timesOn <- ifelse(is.na(timesOn) | is.nan(timesOn), 0, timesOn)
      # Sum the lists
      sumOff <- sum( timesOff , na.rm = TRUE)
      sumOn <- sum( timesOn , na.rm = TRUE)
      # Calculate the difference and assign to the new column
      df[[new_col_name]][i] <- sumOff - sumOn
    }
    print(att)
  }
  print(prod,)
}

#labels de atributos
for (att in atts) {
  # Construct dynamic column names based on `att`
  Var <- paste0( 'ET' , att , '_Label' )
  col_timesOff <- paste0(Var, ".timesOff")
  col_timesOn <- paste0(Var, ".timesOn")
  new_col_name <- paste0(Var, "_TIME")  # New column name
  
  # Initialize the new column as NA
  df[[new_col_name]] <- NA
  
  # Loop through each row and apply the calculation
  for (i in 1:nrow(df)) {
    timesOff <- df[[col_timesOff]][[i]]  # Get the timesOff list for row i
    timesOn <- df[[col_timesOn]][[i]]    # Get the timesOn list for row i
    timesOff <- unlist(timesOff)
    timesOn <- unlist(timesOn)
    # Handle NULLs, NAs, and empty lists
    if (is.null(timesOff) || length(timesOff) == 0) timesOff <- numeric(0)
    if (is.null(timesOn) || length(timesOn) == 0) timesOn <- numeric(0)
    # Replace NA values inside the lists with 0 before summing (if needed)
    timesOff <- ifelse(is.na(timesOff) | is.nan(timesOff), 0, timesOff)
    timesOn <- ifelse(is.na(timesOn) | is.nan(timesOn), 0, timesOn)
    # Sum the lists
    sumOff <- sum( timesOff , na.rm = TRUE)
    sumOn <- sum( timesOn , na.rm = TRUE)
    # Calculate the difference and assign to the new column
    df[[new_col_name]][i] <- sumOff - sumOn
  }
  print(att)
}

prods <- c('_Bus','_Metro','_RH','_Label')

#sumar todo fijo atributo
for (att in atts) {
  # Construct dynamic column names based on `att`
  Var <- paste0( 'ET' , att )
  new_col_name <- paste0(Var, "_TIME")  # New column name
  # Initialize the new column as NA
  df[[new_col_name]] <- NA
  # Loop through each row and apply the calculation
  for (i in 1:nrow(df)) {
    # Calculate the difference and assign to the new column
    df[[new_col_name]][i] <- ( df[[paste0('ET_Bus', att, "_TIME")]][i] + df[[paste0('ET_Metro', att, "_TIME")]][i] + df[[paste0('ET_RH', att, "_TIME")]][i] + df[[paste0('ET', att, "_Label_TIME")]][i] )
  }
  print(att)
}

#--------------------------------------CLUSTERS----------------------------------------------------------------------------------
#normalizaciones
df <- df %>%
  mutate(
    `%ET_Cost_TIME` = ET_Cost_TIME / rowSums(select(df, ET_Cost_TIME:ET_Label_TIME)),  # sum only columns A to E
    `%ET_Time_TIME` = ET_Time_TIME / rowSums(select(df, ET_Cost_TIME:ET_Label_TIME)),
    `%ET_Comfort_TIME` = ET_Comfort_TIME / rowSums(select(df, ET_Cost_TIME:ET_Label_TIME)),
    `%ET_CO2_TIME` = ET_CO2_TIME / rowSums(select(df, ET_Cost_TIME:ET_Label_TIME)),
    `%ET_TRANSPORT_TIME` = ET_Label_TIME / rowSums(select(df, ET_Cost_TIME:ET_Label_TIME)),
  )


df <- df %>% filter(!is.nan(`%ET_Cost_TIME`))

percentage_columns <- select(df, `%ET_Cost_TIME`, `%ET_Time_TIME`, `%ET_Comfort_TIME`, `%ET_CO2_TIME` ) #, `%ET_TRANSPORT_TIME`)

any(is.na(df[, c(`%ET_Cost_TIME`, `%ET_Time_TIME`, `%ET_Comfort_TIME`, `%ET_CO2_TIME`, `%ET_TRANSPORT_TIME`)]))  # Check for NA
any(is.nan(df[, c(`%ET_Cost_TIME`, `%ET_Time_TIME`, `%ET_Comfort_TIME`, `%ET_CO2_TIME`, `%ET_TRANSPORT_TIME`)]))  # Check for NaN
any(is.infinite(df[, c(`%ET_Cost_TIME`, `%ET_Time_TIME`, `%ET_Comfort_TIME`, `%ET_CO2_TIME`, `%ET_TRANSPORT_TIME`)]))  # Check for Inf


# Perform K-means clustering with 8 clusters----------------------------------------------------------------------------
set.seed(123)  # Setting seed for reproducibility
cent = 16
kmeans_result <- kmeans(percentage_columns, centers = cent, nstart = 50, iter.max = 100)

#performance of the cluster:
withniss <- kmeans_result$tot.withinss  # Total within-cluster sum of squares; lower values, better performance
between <- kmeans_result$betweenss    # Between-cluster sum of squares; measures how separated they are, higher, better
centers <- kmeans_result$centers      # Centroids of the clusters, coordinates of the cluster centers
sizes <- kmeans_result$size         # Size of each cluster

#plotvalues----------------------

# Extracting the relevant information
clusters <- 1:cent # Cluster indices (1, 2, ..., cent)
within <- kmeans_result$withinss  # Within-cluster sum of squares for each cluster
between <- kmeans_result$betweenss  # Between-cluster sum of squares
centers <- kmeans_result$centers  # Cluster centers (coordinates)
sizes <- kmeans_result$size  # Sizes of clusters

# Create a data frame for plotting
plot_data <- data.frame(
  Cluster = clusters,
  Within = within,
  Between = between,
  Size = sizes,
  Centers = I(lapply(1:cent, function(i) paste(centers[i, ], collapse = ", ")))
)

# Reshape the data for easier plotting
plot_data_long <- melt(plot_data, id.vars = c("Cluster", "Centers"), 
                       measure.vars = c("Within", "Between", "Size"),
                       variable.name = "Metric", value.name = "Value")

# Create a ggplot
ggplot(plot_data_long, aes(x = factor(Cluster), y = Value, fill = Metric, label = round(Value, 2))) +
  geom_bar(stat = "identity", position = "dodge", show.legend = FALSE) +
  geom_text(aes(y = Value + 0.5), position = position_dodge(0.8), size = 3) +
  facet_wrap(~ Metric, scales = "free_y") +
  labs(
    title = "KMeans Clustering Summary",
    x = "Cluster",
    y = "Value"
  ) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))

clusters <- 1:cent # Cluster indices (1, 2, ..., cent)
within <- kmeans_result$tot.withinss  # Total within-cluster sum of squares
between <- kmeans_result$betweenss    # Total between-cluster sum of squares
centers <- kmeans_result$centers      # Cluster centers (coordinates)
sizes <- kmeans_result$size           # Sizes of clusters (number of points in each cluster)

# Creating a data frame to display the info
summary_table <- data.frame(
  Cluster = clusters,
  Within = rep(within, length(clusters)),   # Assuming you want to repeat the total within SS for each cluster
  Between = rep(between, length(clusters)), # Same for between SS
  Centers = I(lapply(1:cent, function(i) paste(centers[i, ], collapse = ", "))),
  Size = sizes
)

kable(summary_table, caption = "KMeans Clustering Summary")




# Optimal number of clusters
#test = 40
#wss <- sapply(1:test, function(k) {
#  kmeans(percentage_columns, centers = k, nstart = 50)$tot.withinss
#})
## Plot the results
#plot(1:test, wss, type = "b", pch = 19, frame = FALSE,
#     xlab = "Number of Clusters (k)", ylab = "Total Within-Cluster Sum of Squares")

# Add the cluster labels to the original dataframe
df$cluster <- kmeans_result$cluster

# Calculate the mean of each column for each cluster
cluster_means <- aggregate(. ~ Cluster, data = cbind(percentage_columns, Cluster = df$cluster), FUN = mean)
#reshape data
cluster_means_long <- pivot_longer(cluster_means, cols = -Cluster, names_to = "Variable", values_to = "MeanValue")
ggplot(cluster_means_long, aes(x = Variable, y = MeanValue, fill = Cluster)) +
  geom_bar(stat = "identity", position = "dodge") +
  facet_wrap(~ Cluster) +
  theme_minimal() +
  labs(title = "Mean Values of Variables per Cluster", y = "Mean Value", x = "Variable") +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))

#summarize data
summary_data <- df %>%
  group_by(Trial, cluster) %>%
  summarise(Count = n_distinct(participant), .groups = "drop")

#Plot total clusters per trial
ggplot(summary_data, aes(x = Trial, y = Count, color = cluster, group = cluster)) +
  geom_line(size = 0.5, alpha = 0.5) +  # Add alpha (transparency) to lines
  geom_point(size = 1, alpha = 0.5) +    # Add alpha (transparency) to points
  facet_wrap(~ cluster, scales = "free_y") +
  geom_vline(xintercept = 101, color = "red", linetype = "dashed", size = 1, alpha = 0.5) + 
  labs(title = "Number of Participants per Cluster per Trial", 
       x = "Trial", 
       y = "Count of Participants", 
       color = "Cluster") +
  theme_minimal() +
  theme(legend.position = "top")


##simple clusters--------------------------------------------------
df_C <- select(df, `Trial`, `participant`, `cluster` ) 

df_C$cluster <- factor(df_C$cluster)

ggplot(df_C, aes(x = Trial, y = as.factor(participant), color = cluster, group = participant)) +
  geom_step(size = 1) +  # Create step transitions
  labs(title = "Cluster changes for each Participant over time",
       x = "Trial", y = "Participant", color = "Cluster") +
  scale_color_viridis(discrete = TRUE) +
  theme_minimal() +
  theme(panel.grid.major = element_blank(), panel.grid.minor = element_blank(),
        legend.position = "bottom")

##

class_order_at_time100 <- df_C %>%
  filter(Trial == 100) %>%
  arrange(participant) %>%
  pull(cluster)

# 2. Reorder the 'Class' factor based on Time = 5
df_C$cluster <- factor(df$cluster, levels = class_order_at_time100)

# 3. Create the plot
ggplot(df_C, aes(x = Trial, y = participant, color = cluster)) +
  geom_point(size = 3) +
  scale_color_viridis(discrete = TRUE) +
  scale_y_continuous(
    breaks = unique(df_C$participant),
    labels = unique(df_C$participant)
  ) +  # Ensures y-axis is ordered by ID
  theme_minimal() +
  labs(title = "Cluster Switching Over Time", x = "Trial", y = "Participant") +
  theme(legend.position = "top")

##-----------------------------------------------------------------






