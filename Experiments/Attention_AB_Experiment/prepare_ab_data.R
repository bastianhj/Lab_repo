################################################################################
# Prepare AB experiment data: BAB_5 and BAB_U, dropping each participant's last
# 100 trials. The resulting CSV is used by the simple MNL scripts in this folder.
################################################################################

rm(list = ls())

library(readr)
library(dplyr)
library(purrr)
library(stringr)

current_script <- function() {
  args <- commandArgs(trailingOnly = FALSE)
  file_arg <- grep("^--file=", args, value = TRUE)
  if (length(file_arg) > 0) return(normalizePath(sub("^--file=", "", file_arg[1])))
  if (requireNamespace("rstudioapi", quietly = TRUE) && rstudioapi::isAvailable()) {
    path <- rstudioapi::getActiveDocumentContext()$path
    if (!is.null(path) && nzchar(path)) return(normalizePath(path))
  }
  if (file.exists("prepare_ab_data.R")) {
    return(normalizePath("prepare_ab_data.R", mustWork = TRUE))
  }
  if (file.exists(file.path("AB_Experiment", "prepare_ab_data.R"))) {
    return(normalizePath(file.path("AB_Experiment", "prepare_ab_data.R"), mustWork = TRUE))
  }
  normalizePath("prepare_ab_data.R", mustWork = FALSE)
}

script_dir <- dirname(current_script())
root_dir <- normalizePath(file.path(script_dir, ".."), mustWork = TRUE)

add_missing_columns <- function(df, cols) {
  for (col in cols) if (!col %in% names(df)) df[[col]] <- NA_character_
  df
}

read_experiment_folder <- function(folder_name) {
  folder_path <- file.path(root_dir, folder_name)
  csv_files <- list.files(folder_path, pattern = "\\.[cC][sS][vV]$", full.names = TRUE)
  if (length(csv_files) == 0) {
    stop("No CSV files found for ", folder_name, " in: ", folder_path)
  }
  needed_cols <- c(
    "participant", "PROLIFIC_PID", "PROLIFIC_ID", "Choice", "Trial",
    "TrialDuration", "Bus_cost", "metro_cost", "RH_cost",
    "Bus_travel_time", "Bus_Comfort", "Bus_CO2",
    "metro_travel_time", "metro_Comfort", "metro_CO2",
    "RH_travel_time", "RH_Comfort", "RH_CO2"
  )
  map_dfr(csv_files, function(file) {
    read_csv(file, col_types = cols(.default = col_character())) %>%
      add_missing_columns(needed_cols) %>%
      mutate(GROUP_EXPERIMENT = folder_name, SOURCE_FILE = basename(file))
  })
}

normalize_minmax <- function(x) {
  x <- as.numeric(x)
  denom <- max(x, na.rm = TRUE) - min(x, na.rm = TRUE)
  if (!is.finite(denom) || denom == 0) return(rep(0, length(x)))
  (x - min(x, na.rm = TRUE)) / denom
}

ab_data <- map_dfr(c("BAB_5", "BAB_U"), read_experiment_folder) %>%
  mutate(
    Trial = as.numeric(Trial),
    TrialDuration = as.numeric(TrialDuration),
    across(c(
      Bus_cost, metro_cost, RH_cost,
      Bus_travel_time, Bus_Comfort, Bus_CO2,
      metro_travel_time, metro_Comfort, metro_CO2,
      RH_travel_time, RH_Comfort, RH_CO2
    ), as.numeric),
    PROLIFIC_PID = coalesce(
      as.character(PROLIFIC_PID),
      as.character(PROLIFIC_ID),
      as.character(participant),
      SOURCE_FILE
    ),
    Choice = str_remove(as.character(Choice), "_label$"),
    Choice = case_when(
      Choice == "Bus" ~ 1,
      Choice == "Metro" ~ 2,
      Choice == "RH" ~ 3,
      TRUE ~ NA_real_
    )
  ) %>%
  filter(!is.na(Choice), Choice < 4, !is.na(Trial), !is.na(RH_CO2)) %>%
  arrange(GROUP_EXPERIMENT, PROLIFIC_PID, SOURCE_FILE, Trial) %>%
  distinct(GROUP_EXPERIMENT, PROLIFIC_PID, Trial, .keep_all = TRUE) %>%
  group_by(GROUP_EXPERIMENT, PROLIFIC_PID) %>%
  arrange(Trial, .by_group = TRUE) %>%
  mutate(
    trial_rank = row_number(),
    n_trials_participant = n(),
    keep_after_drop_last_100 = trial_rank <= pmax(n_trials_participant - 100, 0)
  ) %>%
  filter(keep_after_drop_last_100) %>%
  ungroup() %>%
  mutate(
    AB_GROUP = recode(GROUP_EXPERIMENT, BAB_5 = "AB_5", BAB_U = "AB_U"),
    participant = as.integer(factor(paste(GROUP_EXPERIMENT, PROLIFIC_PID))),
    trial_101_200 = 1 * (trial_rank > 100 & trial_rank <= 200),
    NorTrial_pre = if_else(trial_rank <= 100, (trial_rank - 1) / 99, 0),
    NorTrial_101_200 = if_else(trial_rank > 100 & trial_rank <= 200, (trial_rank - 101) / 99, 0),
    NorTrial_10 = if_else(trial_rank <= 10, (trial_rank - 1) / 9, 0)
  ) %>%
  select(
    GROUP_EXPERIMENT, AB_GROUP, participant, PROLIFIC_PID, SOURCE_FILE,
    Trial, trial_rank, n_trials_participant, Choice, TrialDuration,
    Bus_cost, metro_cost, RH_cost,
    Bus_travel_time, Bus_Comfort, Bus_CO2,
    metro_travel_time, metro_Comfort, metro_CO2,
    RH_travel_time, RH_Comfort, RH_CO2,
    trial_101_200, NorTrial_pre, NorTrial_101_200, NorTrial_10
  )

write_csv(ab_data, file.path(script_dir, "AB_BAB5_BABU_drop_last_100.csv"))

summary_data <- ab_data %>%
  count(AB_GROUP, GROUP_EXPERIMENT, PROLIFIC_PID, name = "kept_trials") %>%
  summarise(
    participants = n(),
    min_kept_trials = min(kept_trials),
    max_kept_trials = max(kept_trials),
    total_rows = sum(kept_trials),
    .by = c(AB_GROUP, GROUP_EXPERIMENT)
  )
write_csv(summary_data, file.path(script_dir, "AB_data_summary.csv"))

message("Saved: ", file.path(script_dir, "AB_BAB5_BABU_drop_last_100.csv"))
message("Saved: ", file.path(script_dir, "AB_data_summary.csv"))
