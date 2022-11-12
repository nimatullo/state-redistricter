package io.pufferlabs.statesredistrictor.model;

import io.pufferlabs.statesredistrictor.enums.Party;
import io.pufferlabs.statesredistrictor.enums.Race;
import lombok.Data;

import java.util.List;

@Data // lombok annotation to generate getters and setters
public class Representative {
    private String name;
    private Party party;
    private Race race;
    private List<Population> votes;
}
