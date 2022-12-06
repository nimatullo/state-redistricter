package io.pufferlabs.statesredistrictor.model;

import lombok.Data;


import org.springframework.data.annotation.Id;

@Data
public class Overview {
    @Id
    private String state;
    private Integer opportunityDistricts;
    private Integer safeDistricts; //margin of victory > 15% (50% win + 15% margin)
    private Double polsbyPopperScore;

}
