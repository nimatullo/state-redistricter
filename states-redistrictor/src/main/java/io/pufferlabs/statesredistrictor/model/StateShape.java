package io.pufferlabs.statesredistrictor.model;

import lombok.Data;

import java.util.List;

@Data
public class StateShape {
    private String type;
    private Geometry geometry;
    private Long id;
    private String properties;
    private List<Double> centerCoordinates;
}
