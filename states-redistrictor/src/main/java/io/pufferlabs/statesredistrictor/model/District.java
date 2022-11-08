package io.pufferlabs.statesredistrictor.model;

import lombok.Data;

import java.util.List;

@Data
public class District {
    private Geometry shape;
    private Integer id;
    private List<Population> populations;
    private List<Representative> reps;
}