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
    private Map<Race, Map<String, Map<String, Double>>> boxAndWhiskerPlots;
    private Map<Party, Map<String, Double>> voteSeatSharePercentages;
    private List<Integer> demRepSplitCounts; //list of tallies for each time a # of dems and reps are in a plan, for an ensemble
    private List<Integer> opportunityRepCounts; //number of times that an opp rep occured per district

}
