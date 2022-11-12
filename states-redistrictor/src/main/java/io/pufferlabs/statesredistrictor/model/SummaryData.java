package io.pufferlabs.statesredistrictor.model;

import io.pufferlabs.statesredistrictor.enums.PlanType;
import lombok.Data;

@Data

public class SummaryData {
    private PlanType planType;
    private Integer totalDistrictPlans;
    private Double avgOpportunityReps;
    private Double avgEqualPopMeasure;
    private Double avgPolsbyPopperMeasure;
    private Double avgRepDemSplit;

}
