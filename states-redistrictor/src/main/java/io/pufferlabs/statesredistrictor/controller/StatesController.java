package io.pufferlabs.statesredistrictor.controller;

import io.pufferlabs.statesredistrictor.model.State;
import io.pufferlabs.statesredistrictor.repository.StateRepository;
import io.pufferlabs.statesredistrictor.service.StatesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/states")
@CrossOrigin(value = "*")
public class StatesController {

    private final StatesService statesService;

    private final StateRepository stateRepository;

    @Autowired
    public StatesController(StatesService statesService, StateRepository stateRepository) {
        this.statesService = statesService;
        this.stateRepository = stateRepository;
    }

    //DEPRECATED
//    @GetMapping("/{state}/shape")
//    public ResponseEntity<?> getGeoJsonForState(@PathVariable String state) {
//        return statesService.readGeoJsonFromDisk(state);
//    }

    //get all states
    @GetMapping
    public ResponseEntity<?> getStates() {
        return ResponseEntity.ok(statesService.getStates());
    }


    // get state by name
    @GetMapping("/{stateName}")
    public ResponseEntity<?> getStateByName(@PathVariable String stateName) {
        State state = statesService.getStateByName(stateName);
        state.setDistrictPlans(null);
        return ResponseEntity.ok(state);
    }
}
