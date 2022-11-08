package io.pufferlabs.statesredistrictor.model;

import io.pufferlabs.statesredistrictor.enums.StateAbbreviation;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import java.util.List;

@Document(collection = "states")
@Data
public class State {
    private String name;
    private StateAbbreviation abbreviation;
    private StateShape stateShape;
    private List<DistrictPlan> districtPlans;
}
