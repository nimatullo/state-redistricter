package io.pufferlabs.statesredistrictor.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
public class Overview {
    @Id
    private String state;
    private List<Population> populations;
    private Double percentDem;
    private Double percentRep;
    private Integer opportunityDistricts;
    private Integer safeDistricts; //margin of victory > 15% (50% win + 15% margin)
    private Double polsbyPopperScore;

}
