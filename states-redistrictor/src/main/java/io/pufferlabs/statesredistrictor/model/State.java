package io.pufferlabs.statesredistrictor.model;

import io.pufferlabs.statesredistrictor.enums.PlanType;
import io.pufferlabs.statesredistrictor.enums.StateAbbreviation;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Document(collection = "states")
@Data
public class State {
    private String name;
    private StateAbbreviation abbreviation;
    private StateShape stateShape;
    private List<DistrictPlan> uniqueDistrictPlans;
    private Analysis analysis;
    private Map<PlanType, SummaryData> ensembleSummaryData;

}
