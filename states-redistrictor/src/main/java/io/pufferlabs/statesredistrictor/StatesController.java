package io.pufferlabs.statesredistrictor;

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
    public StatesController() {

    }

    @GetMapping
    public ResponseEntity<?> getStates() {
        return ResponseEntity.ok(List.of("Florida", "Arkansas", "North Carolina"));
    }

    @GetMapping("/{state}/shape")
    public ResponseEntity<?> getGeoJsonForState(@PathVariable String state) {
        File file = null;
        try {
            state = state.replace(" ", "").toLowerCase();
            String path = String.format("src/main/resources/json/%s.geojson", state);
            file = ResourceUtils.getFile(path);
            String content = new String(Files.readAllBytes(file.toPath()));
            return ResponseEntity.ok(content);
        } catch (FileNotFoundException e) {
            return new ResponseEntity<>("The requested state " + state + " could not be fetched", HttpStatus.NOT_FOUND);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

}
