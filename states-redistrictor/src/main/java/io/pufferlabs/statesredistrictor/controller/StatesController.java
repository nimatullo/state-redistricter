package io.pufferlabs.statesredistrictor.controller;

import io.pufferlabs.statesredistrictor.model.State;
import io.pufferlabs.statesredistrictor.repository.StateRepository;
import io.pufferlabs.statesredistrictor.service.StatesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api/states")
@CrossOrigin(value = "*")
public class StatesController {

    private final StatesService statesService;


    @Autowired
    public StatesController(StatesService statesService) {
        this.statesService = statesService;
    }

    @GetMapping
    public ResponseEntity<?> getStates() {
        return ResponseEntity.ok(statesService.getStates());
    }

    @GetMapping("/{stateName}")
    public ResponseEntity<?> getStateByName(@PathVariable String stateName) {
        State state = statesService.getStateByName(stateName);
        state.setDistrictPlans(null);
        return ResponseEntity.ok(state);
    }


}
