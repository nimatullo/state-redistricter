package io.pufferlabs.statesredistrictor.model;

import io.pufferlabs.statesredistrictor.enums.PlanType;
import lombok.Data;

@Data
public class SummaryData {
    private PlanType planType;
    private Double averageEfficiencyGap;
    private Double averageMajorityMinorityDistrictCount;
}
