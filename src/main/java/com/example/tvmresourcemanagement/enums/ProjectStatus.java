package com.example.tvmresourcemanagement.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ProjectStatus {
    ACTIVE("Active"),
    COMPLETED("Completed"),
    INACTIVE("Inactive");

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
        for (ProjectStatus status : values()) {
            if (status.name().equalsIgnoreCase(value) || status.displayName.equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid project status: " + value);
    }
}
