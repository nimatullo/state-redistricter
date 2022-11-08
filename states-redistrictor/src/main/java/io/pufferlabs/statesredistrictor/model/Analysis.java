package io.pufferlabs.statesredistrictor.model;

import lombok.Data;

import java.util.List;

@Data
public class Analysis {
    private List<List<Double>> boxAndWhiskerPlots;
    private List<List<Double>> voteSeatSharePlots;
    private Double partisanFairness;
    private Double averageRacialFairness;
}
