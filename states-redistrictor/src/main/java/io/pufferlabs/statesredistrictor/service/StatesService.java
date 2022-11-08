package io.pufferlabs.statesredistrictor.service;

import io.pufferlabs.statesredistrictor.model.State;
import io.pufferlabs.statesredistrictor.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@Service
public class StatesService {
    private final StateRepository stateRepository;

    @Autowired
    public StatesService(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }


    //DEPRECATED
//    public ResponseEntity<?> readGeoJsonFromDisk(String state) {
//        File file;
//        try {
//            state = state.replace(" ", "").toLowerCase();
//            String path = String.format("src/main/resources/json/%s.geojson", state);
//            file = ResourceUtils.getFile(path);
//            String content = new String(Files.readAllBytes(file.toPath()));
//            return ResponseEntity.ok(content);
//        } catch (FileNotFoundException e) {
//            return new ResponseEntity<>("The requested state " + state + " could not be fetched", HttpStatus.NOT_FOUND);
//        } catch (IOException e) {
//            return ResponseEntity.internalServerError().body(e.getMessage());
//        }
//    }

    public List<State> getStates() {
        return stateRepository.findAll();
    }
}
