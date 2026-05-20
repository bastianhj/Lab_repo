################################################################################
# AB Experiment - Simple MNL, no heterogeneity, no panel aggregation
# Data: BAB_5 and BAB_U renamed as AB_5 and AB_U, dropping the last 100 trials
# per participant. This model uses the first 200 kept iterations only.
################################################################################

rm(list = ls())

library(apollo)
library(readr)
library(dplyr)

current_script <- function() {
  args <- commandArgs(trailingOnly = FALSE)
  file_arg <- grep("^--file=", args, value = TRUE)
  if (length(file_arg) > 0) return(normalizePath(sub("^--file=", "", file_arg[1])))
  if (requireNamespace("rstudioapi", quietly = TRUE) && rstudioapi::isAvailable()) {
    path <- rstudioapi::getActiveDocumentContext()$path
    if (!is.null(path) && nzchar(path)) return(normalizePath(path))
  }
  if (file.exists("MNL_simple.R")) {
    return(normalizePath("MNL_simple.R", mustWork = TRUE))
  }
  if (file.exists(file.path("AB_Experiment", "MNL_simple.R"))) {
    return(normalizePath(file.path("AB_Experiment", "MNL_simple.R"), mustWork = TRUE))
  }
  normalizePath("MNL_simple.R", mustWork = FALSE)
}

script_dir <- dirname(current_script())
setwd(script_dir)
source(file.path(script_dir, "AB_mnl_helpers.R"))

data_path <- file.path(script_dir, "AB_BAB5_BABU_drop_last_100.csv")
if (!file.exists(data_path) && file.exists(file.path("AB_Experiment", "AB_BAB5_BABU_drop_last_100.csv"))) {
  data_path <- normalizePath(file.path("AB_Experiment", "AB_BAB5_BABU_drop_last_100.csv"))
}
if (!file.exists(data_path)) {
  stop("Missing AB_BAB5_BABU_drop_last_100.csv. Run prepare_ab_data.R first.")
}

data <- read_csv(data_path, show_col_types = FALSE) %>%
  filter(Choice < 4, trial_rank <= 200)

model_groups <- sort(unique(data$AB_GROUP))

for (current_group in model_groups) {
  message("Estimating MNL_simple for group: ", current_group)
  
  apollo_initialise()
  
  apollo_control <- list(
    modelName = paste0("MNL_simple_", current_group),
    modelDescr = paste("AB simple MNL, first 200 kept trials, no heterogeneity, panel likelihood -", current_group),
    indivID = "PROLIFIC_PID",
    outputDirectory = file.path(script_dir, "MNL_simple"),
    workInLogs = TRUE,
    nCores = 5
  )
  
  database <- data %>% filter(AB_GROUP == current_group)
  
  apollo_beta <- c(
    b_bus = 0,
    b_metro = 0,
    b_RH = 0,
    
    b_time0 = 0,
    b_time_101_200 = 0,
    b_time_time_slope = 0,
    b_time_101_200_slope = 0,
    
    b_cost0 = 0,
    b_cost_101_200 = 0,
    b_cost_time_slope = 0,
    b_cost_101_200_slope = 0,
    
    b_comfort0 = 0,
    b_comfort_101_200 = 0,
    b_comfort_time_slope = 0,
    b_comfort_101_200_slope = 0,
    
    b_co20 = 0,
    b_co2_101_200 = 0,
    b_co2_time_slope = 0,
    b_co2_101_200_slope = 0
  )
  
  apollo_fixed <- c("b_RH")
  apollo_inputs <- apollo_validateInputs()
  
  apollo_probabilities <- function(apollo_beta, apollo_inputs, functionality = "estimate") {
    apollo_attach(apollo_beta, apollo_inputs)
    on.exit(apollo_detach(apollo_beta, apollo_inputs))
    
    P <- list()
    
    b_cost <-
      b_cost0 +
      b_cost_time_slope * NorTrial_pre +
      trial_101_200 * (b_cost_101_200 + b_cost_101_200_slope * NorTrial_101_200)
    
    b_time <-
      b_time0 +
      b_time_time_slope * NorTrial_pre +
      trial_101_200 * (b_time_101_200 + b_time_101_200_slope * NorTrial_101_200)
    
    b_comfort <-
      b_comfort0 +
      b_comfort_time_slope * NorTrial_pre +
      trial_101_200 * (b_comfort_101_200 + b_comfort_101_200_slope * NorTrial_101_200)
    
    b_co2 <-
      b_co20 +
      b_co2_time_slope * NorTrial_pre +
      trial_101_200 * (b_co2_101_200 + b_co2_101_200_slope * NorTrial_101_200)
    
    V <- list()
    V[["bus"]] <- b_bus + b_cost * Bus_cost + b_time * Bus_travel_time +
      b_comfort * Bus_Comfort + b_co2 * Bus_CO2
    V[["metro"]] <- b_metro + b_cost * metro_cost + b_time * metro_travel_time +
      b_comfort * metro_Comfort + b_co2 * metro_CO2
    V[["RH"]] <- b_RH + b_cost * RH_cost + b_time * RH_travel_time +
      b_comfort * RH_Comfort + b_co2 * RH_CO2
    
    mnl_settings <- list(
      alternatives = c(bus = 1, metro = 2, RH = 3),
      avail = 1,
      choiceVar = Choice,
      utilities = V
    )
    
    P[["model"]] <- apollo_mnl(mnl_settings, functionality)
    P <- apollo_panelProd(P, apollo_inputs, functionality)
    P <- apollo_prepareProb(P, apollo_inputs, functionality)
    return(P)
  }
  
  model <- apollo_estimate(
    apollo_beta,
    apollo_fixed,
    apollo_probabilities,
    apollo_inputs,
    estimate_settings = list(estimationRoutine = "bfgs")
  )
  
  apollo_saveOutput(model)
  apollo_modelOutput(model)
  summarise_attributes_delta(
    model = model,
    database = database,
    apollo_beta = apollo_beta,
    model_name = apollo_control$modelName,
    output_dir = apollo_control$outputDirectory,
    mode = "first200"
  )
}
