package io.pufferlabs.statesredistrictor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@RestController
@RequestMapping(value = "/api/states")
@CrossOrigin(value = "*")
public class StatesController {

    @Autowired
    private final StatesService statesService;
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
