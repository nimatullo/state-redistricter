package io.pufferlabs.statesredistrictor.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "analyzes")
public class Analysis {
    @Id
    private String state;
    private List<List<Double>> boxAndWhiskerPlots;
    private List<List<Double>> voteSeatSharePlots;
    private Double partisanFairness;
    private Double averageRacialFairness;
}
