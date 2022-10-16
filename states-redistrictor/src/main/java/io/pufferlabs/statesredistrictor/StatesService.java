package io.pufferlabs.statesredistrictor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;

@Service
public class StatesService {
    public ResponseEntity<?> readGeoJsonFromDisk(String state) {
        File file;
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
