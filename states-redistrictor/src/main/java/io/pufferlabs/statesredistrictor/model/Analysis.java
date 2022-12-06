package io.pufferlabs.statesredistrictor.model;

import io.pufferlabs.statesredistrictor.enums.Party;
import io.pufferlabs.statesredistrictor.enums.Race;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.Map;

@Data
public class Analysis {
    @Id
    private String state;
    private Map<Race, Map<String, Map<String, Double>>> SMDBoxAndWhiskerPlots;
    private Map<Race, Map<String, Map<String, Double>>> MMDBoxAndWhiskerPlots;
    private Map<Party, Map<String, Double>> voteSeatSharePercentages;
    private List<List<Double>> demRepSplits; //list of splits per plan
    private Double avgOpportunityReps; 

}
