package io.pufferlabs.statesredistrictor.model;

import io.pufferlabs.statesredistrictor.enums.StateAbbreviation;
import lombok.Data;

import java.util.List;

@Data
public class State {
    private String name;
    private StateAbbreviation abbreviation;
    private StateShape stateShape;
    private List<DistrictPlan> districtPlans;
}
