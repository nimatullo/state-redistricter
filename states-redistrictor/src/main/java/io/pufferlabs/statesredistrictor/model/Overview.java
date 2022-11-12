package io.pufferlabs.statesredistrictor.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Overview {
    @Id
    private String state;
    private Integer numReps;
    private Integer totalPopulation;
    private Double percentDem;
    private Double percentRep;
    private Integer opportunityDistricts;
    private Integer safeDistricts;
    private Double polsbyPopperScore;

}
