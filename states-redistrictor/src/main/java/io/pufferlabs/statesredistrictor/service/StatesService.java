package io.pufferlabs.statesredistrictor.service;

import io.pufferlabs.statesredistrictor.model.Overview;
import io.pufferlabs.statesredistrictor.model.State;
import io.pufferlabs.statesredistrictor.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatesService {
    private final StateRepository stateRepository;

    @Autowired
    public StatesService(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }


    public State getStateByName(String state) {
        return stateRepository.findByName(state);
    }

    public List<State> getStates() {
        return stateRepository.findAll();
    }

}
