################################################################################
# Helpers for AB Experiment simple MNL scripts
################################################################################

library(dplyr)
library(ggplot2)
library(readr)

get_model_vcov <- function(model) {
  vcov_candidates <- list(
    robvarcov = model$robvarcov,
    varcov = model$varcov,
    BHHHvarcov = model$BHHHvarcov
  )

  for (candidate in vcov_candidates) {
    if (is.null(candidate)) next
    candidate <- as.matrix(candidate)
    if (length(candidate) == 0 || any(dim(candidate) == 0)) next
    if (is.null(colnames(candidate)) && length(model$estimate) == ncol(candidate)) {
      colnames(candidate) <- names(model$estimate)
      rownames(candidate) <- names(model$estimate)
    }
    if (!is.null(colnames(candidate)) && !all(is.na(candidate))) return(candidate)
  }

  NULL
}

delta_se <- function(gradient, vcov_matrix) {
  tryCatch(
    {
      if (is.null(vcov_matrix) || is.null(gradient)) {
        return(rep(NA_real_, nrow(gradient)))
      }

      common_names <- intersect(colnames(gradient), colnames(vcov_matrix))
      if (length(common_names) == 0) {
        return(rep(NA_real_, nrow(gradient)))
      }

      gradient <- as.matrix(gradient[, common_names, drop = FALSE])
      vcov_matrix <- as.matrix(vcov_matrix[common_names, common_names, drop = FALSE])

      valid_rows <- apply(gradient, 1, function(row) all(is.finite(row)))
      se <- rep(NA_real_, nrow(gradient))
      if (!any(valid_rows)) return(se)

      valid_gradient <- gradient[valid_rows, , drop = FALSE]
      variances <- rowSums((valid_gradient %*% vcov_matrix) * valid_gradient)
      variances[variances < 0 & variances > -1e-10] <- 0
      se[valid_rows] <- sqrt(ifelse(is.na(variances), NA_real_, pmax(variances, 0)))
      se
    },
    error = function(e) {
      rep(NA_real_, nrow(gradient))
    }
  )
}

estimate_value <- function(estimates, name) {
  if (name %in% names(estimates)) return(estimates[[name]])
  0
}

attribute_spec <- function(attribute) {
  if (attribute == "co2") {
    return(list(
      base = "b_co20",
      phase = "b_co2_101_200",
      slope = "b_co2_time_slope",
      phase_slope = "b_co2_101_200_slope"
    ))
  }

  list(
    base = paste0("b_", attribute, "0"),
    phase = paste0("b_", attribute, "_101_200"),
    slope = paste0("b_", attribute, "_time_slope"),
    phase_slope = paste0("b_", attribute, "_101_200_slope")
  )
}

attribute_value_gradient <- function(cost_df, estimates, model, attribute,
                                     mode = c("first200", "first10")) {
  mode <- match.arg(mode)
  spec <- attribute_spec(attribute)

  if (mode == "first200") {
    value <-
      estimate_value(estimates, spec$base) +
      estimate_value(estimates, spec$slope) * cost_df$NorTrial_pre +
      cost_df$trial_101_200 * (
        estimate_value(estimates, spec$phase) +
          estimate_value(estimates, spec$phase_slope) * cost_df$NorTrial_101_200
      )

    gradient <- matrix(
      0,
      nrow = nrow(cost_df),
      ncol = length(model$estimate),
      dimnames = list(NULL, names(model$estimate))
    )
    if (spec$base %in% colnames(gradient)) gradient[, spec$base] <- 1
    if (spec$slope %in% colnames(gradient)) gradient[, spec$slope] <- cost_df$NorTrial_pre
    if (spec$phase %in% colnames(gradient)) gradient[, spec$phase] <- cost_df$trial_101_200
    if (spec$phase_slope %in% colnames(gradient)) {
      gradient[, spec$phase_slope] <- cost_df$trial_101_200 * cost_df$NorTrial_101_200
    }
  } else {
    value <-
      estimate_value(estimates, spec$base) +
      estimate_value(estimates, spec$slope) * cost_df$NorTrial_10

    gradient <- matrix(
      0,
      nrow = nrow(cost_df),
      ncol = length(model$estimate),
      dimnames = list(NULL, names(model$estimate))
    )
    if (spec$base %in% colnames(gradient)) gradient[, spec$base] <- 1
    if (spec$slope %in% colnames(gradient)) gradient[, spec$slope] <- cost_df$NorTrial_10
  }

  list(value = value, gradient = gradient)
}

ratio_value_gradient <- function(numerator, denominator) {
  ratio <- numerator$value / denominator$value
  ratio[!is.finite(ratio)] <- NA_real_

  gradient <- (
    denominator$value * numerator$gradient -
      numerator$value * denominator$gradient
  ) / (denominator$value^2)

  gradient[!is.finite(gradient)] <- NA_real_
  list(value = ratio, gradient = gradient)
}

summarise_attributes_delta <- function(model, database, apollo_beta, model_name,
                                       output_dir, mode = c("first200", "first10")) {
  mode <- match.arg(mode)

  estimates <- apollo_beta
  estimates[names(model$estimate)] <- model$estimate
  vcov_matrix <- get_model_vcov(model)

  cost_df <- database %>%
    mutate(trial_plot = trial_rank) %>%
    distinct(trial_plot, trial_101_200, NorTrial_pre, NorTrial_101_200, NorTrial_10) %>%
    arrange(trial_plot)

  cost <- attribute_value_gradient(cost_df, estimates, model, "cost", mode)
  time <- attribute_value_gradient(cost_df, estimates, model, "time", mode)
  comfort <- attribute_value_gradient(cost_df, estimates, model, "comfort", mode)
  co2 <- attribute_value_gradient(cost_df, estimates, model, "co2", mode)

  dynamic_items <- list(
    b_cost = cost,
    b_time = time,
    b_comfort = comfort,
    b_co2 = co2,
    vst = ratio_value_gradient(time, cost),
    comfort_cost = ratio_value_gradient(comfort, cost),
    co2_cost = ratio_value_gradient(co2, cost)
  )

  summary_df <- bind_rows(lapply(names(dynamic_items), function(name) {
    item <- dynamic_items[[name]]
    tibble(
      trial = cost_df$trial_plot,
      beta = name,
      mean_est = item$value,
      se = delta_se(item$gradient, vcov_matrix)
    )
  })) %>%
    mutate(
      lower = mean_est - se,
      upper = mean_est + se,
      beta = factor(
        beta,
        levels = c("b_cost", "b_time", "b_comfort", "b_co2", "vst", "comfort_cost", "co2_cost")
      )
    )

  dir.create(output_dir, showWarnings = FALSE, recursive = TRUE)
  write_csv(summary_df, file.path(output_dir, paste0(model_name, "_attributes_delta.csv")))

  ribbon_df <- summary_df %>%
    filter(is.finite(lower), is.finite(upper), is.finite(mean_est))

  plot_delta_facets <- function(df, filename, ncol = 2, labeller_map = NULL) {
    ribbon_plot_df <- df %>%
      filter(is.finite(lower), is.finite(upper), is.finite(mean_est))

    p <- ggplot(df, aes(x = trial)) +
      geom_ribbon(
        data = ribbon_plot_df,
        aes(ymin = lower, ymax = upper),
        fill = "grey65",
        alpha = 0.5
      ) +
      geom_line(aes(y = mean_est), color = "black", linewidth = 0.9) +
      facet_wrap(
        ~beta,
        scales = "free",
        ncol = ncol,
        labeller = if (is.null(labeller_map)) label_value else as_labeller(labeller_map)
      ) +
      labs(
        x = "Trial",
        y = "Estimate"
      ) +
      theme_bw() +
      theme(
        panel.background = element_rect(fill = "white", color = NA),
        plot.background = element_rect(fill = "white", color = NA),
        panel.grid.minor = element_line(color = "grey93"),
        panel.grid.major = element_line(color = "grey88"),
        axis.text = element_text(size = rel(1.8)),
        axis.title = element_text(size = rel(1.8)),
        strip.text = element_text(size = rel(1.8))
      )

    if (mode == "first200") {
      p <- p + geom_vline(xintercept = 101, linetype = "longdash")
    }

    ggsave(
      file.path(output_dir, filename),
      p,
      width = 10,
      height = 7,
      dpi = 300,
      bg = "white"
    )
  }

  attribute_df <- summary_df %>%
    filter(beta %in% c("b_cost", "b_time", "b_comfort", "b_co2")) %>%
    mutate(beta = factor(beta, levels = c("b_cost", "b_time", "b_comfort", "b_co2")))

  ratio_df <- summary_df %>%
    filter(beta %in% c("vst", "comfort_cost", "co2_cost")) %>%
    mutate(beta = factor(beta, levels = c("vst", "comfort_cost", "co2_cost")))

  plot_delta_facets(
    attribute_df,
    paste0(model_name, "_attribute_betas_delta.png"),
    ncol = 2
  )

  plot_delta_facets(
    ratio_df,
    paste0(model_name, "_attribute_ratios_delta.png"),
    ncol = 3,
    labeller_map = c(
      vst = "b_time/b_cost",
      comfort_cost = "b_comfort/b_cost",
      co2_cost = "b_co2/b_cost"
    )
  )

  invisible(summary_df)
}

summarise_b_cost_delta <- summarise_attributes_delta
