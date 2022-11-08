package io.pufferlabs.statesredistrictor.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "overviews")
public class Overview {
    @Id
    private String state;
    private Integer numReps;
    private Integer totalPopulation;
    private Double percentDem;
    private Double percentRep;
    private Double length;
    private Double width;
}
