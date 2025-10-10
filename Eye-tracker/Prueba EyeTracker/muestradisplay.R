#First Code sample--------------------------------------------------------------

#Paquetes
#install.packages("")
library(viridis)
library(dplyr)
library(png)
library(tidyr)
library(tictoc)
library(jsonlite)
library(glmnet)
library(tidyselect) #seleccionar columnas
library(ggplot2)
library(data.table)
#library(tidyverse)

#StartingScript---------------------------------------------------------------------------------------------------------
script_dir <- dirname(rstudioapi::getSourceEditorContext()$path)
setwd(script_dir)

#extract and clean data------------------------------------------------------------------------
data_dir <- file.path(script_dir, "data")
files <- list.files(path = data_dir, pattern=".csv")

#data <- data.frame()
setwd(data_dir)
df <- rbindlist(lapply(files,function(archivo){
  message("Reading: ", archivo)
  data <-fread(archivo )
  data <- data[-c(1),]
  data$ID <- tools::file_path_sans_ext(basename(archivo))
  return(data)
}), use.names=T, fill=T)
setwd(script_dir)

#--------------Functions--------------------------------------------------------
transform_columns <- function(data, startl, endingl) {
  for (i in startl:endingl) {
    data[[i]] <- gsub(" None", "nan", data[[i]])
    data[[i]] <- gsub("None", "nan", data[[i]])
    data[[i]] <- gsub(" nan", NaN, data[[i]])
    data[[i]] <- gsub("nan", NaN, data[[i]])
    # Convert to numeric: handle lists and split values
    data[[i]] <- sapply(data[[i]], function(x) {
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
 return(data)
}

#---------------------------------------------------------------------------

start_lists = which(colnames(df) == "ETRECORD_FR")
pupil2 = which(colnames(df) == "RIGHTPUPIL_FR")

#transforming lists
tic()
df <- transform_columns(df, start_lists, pupil2)
toc()

