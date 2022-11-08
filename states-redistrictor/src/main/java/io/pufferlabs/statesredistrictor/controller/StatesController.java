package io.pufferlabs.statesredistrictor.controller;

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
    @Autowired
    public StatesController(StatesService statesService) {
        this.statesService = statesService;
    }

    @GetMapping
    public ResponseEntity<?> getStates() {
        return ResponseEntity.ok(List.of("Florida", "Arkansas", "North Carolina"));
    }

    @GetMapping("/{state}/shape")
    public ResponseEntity<?> getGeoJsonForState(@PathVariable String state) {
        return statesService.readGeoJsonFromDisk(state);
    }

}
