package io.pufferlabs.statesredistrictor.model;

import lombok.Data;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class District {
    @Field("id")
    private String id;
    private List<Population> populations;
    private List<Representative> reps;
    private Double demSplit;
    private Double repSplit;
}
