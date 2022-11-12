package io.pufferlabs.statesredistrictor.model;

import io.pufferlabs.statesredistrictor.enums.PlanType;
import lombok.Data;

import java.util.List;

@Data
public class DistrictPlan {
    private List<District> districts;
    private PlanType type;
    private Overview overview;
}
