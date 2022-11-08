package io.pufferlabs.statesredistrictor.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import io.pufferlabs.statesredistrictor.model.State;


public interface StateRepository extends MongoRepository<State, String>, QuerydslPredicateExecutor<State> {

    @Query("{ 'stateName' : ?0 }")
    State findByAbbreviation(String stateName);
    
}
    
