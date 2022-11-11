package io.pufferlabs.statesredistrictor.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import io.pufferlabs.statesredistrictor.model.State;


public interface StateRepository extends MongoRepository<State, String> {

    @Query("{ 'name' : ?0 }")
    State findByName(String stateName);
}
    

