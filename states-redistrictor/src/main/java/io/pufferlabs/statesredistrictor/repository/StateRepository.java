package io.pufferlabs.statesredistrictor.repository;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import io.pufferlabs.statesredistrictor.model.State;
import org.springframework.stereotype.Repository;


@Repository
public interface StateRepository extends MongoRepository<State, String> {

//    @Cacheable("states")
    @Query("{ 'name' : ?0 }")
    State findByName(String stateName);
}
    

