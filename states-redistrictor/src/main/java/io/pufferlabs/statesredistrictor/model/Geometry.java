package io.pufferlabs.statesredistrictor.model;

import lombok.Data;

import java.util.List;

@Data
public class Geometry {
    private String type;
    private List<List<List<Double>>> coordinates;
}
