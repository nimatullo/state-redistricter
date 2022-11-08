package io.pufferlabs.statesredistrictor.model;

import lombok.Data;

@Data
public class Overview {
    private Integer numReps;
    private Integer totalPopulation;
    private Double percentDem;
    private Double percentRep;
    private Double length;
    private Double width;
}
