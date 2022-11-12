package io.pufferlabs.statesredistrictor.model;

import io.pufferlabs.statesredistrictor.enums.Race;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.Map;

@Data
public class Analysis {
    @Id
    private String state;
    private Map<Race, List<List<Double>>> SMDBoxAndWhiskerPlots;
    private Map<Race, List<List<Double>>> MMDBoxAndWhiskerPlots;
    private List<List<Double>> voteSeatSharePlots;
    private List<Integer> demRepSplits;
    private List<Integer> opportunityRepCounts;
    private Double partisanFairness;
    private Double averageRacialFairness;
}
