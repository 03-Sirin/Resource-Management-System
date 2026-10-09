package com.example.tvmresourcemanagement.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ProjectStatus {
    ACTIVE("Active"),
    ON_HOLD("On Hold"),
    COMPLETED("Completed"),
    CANCELLED("Cancelled");

    private final String displayName;

    ProjectStatus(String displayName) {
        this.displayName = displayName;
    }

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    @JsonCreator
    public static ProjectStatus fromValue(String value) {
        if (value == null) {
            throw new IllegalArgumentException("Project status value is required");
        }

        String normalized = value.trim();
        String compactValue = normalized.replace("-", "").replace("_", "").replace(" ", "").toLowerCase();

        for (ProjectStatus status : values()) {
            String statusCompact = status.name().replace("-", "").replace("_", "").replace(" ", "").toLowerCase();
            String displayCompact = status.displayName.replace("-", "").replace("_", "").replace(" ", "").toLowerCase();

            if (statusCompact.equals(compactValue) || displayCompact.equals(compactValue)) {
                return status;
            }
        }

        throw new IllegalArgumentException("Invalid project status: " + value);
    }
}
