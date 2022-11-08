package io.pufferlabs.statesredistrictor.model;

import io.pufferlabs.statesredistrictor.enums.Race;
import lombok.Data;

@Data // lombok annotation to generate getters and setters
public class Population {
    private Race type;
    private Integer count;
}
