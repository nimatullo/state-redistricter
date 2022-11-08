package io.pufferlabs.statesredistrictor.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.mongodb.client.MongoClient;


public interface StateRepository extends MongoRepository<State, String> {

    
}
    

