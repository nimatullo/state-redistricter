package io.pufferlabs.statesredistrictor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class StatesRedistrictorApplication {

	public static void main(String[] args) {
		SpringApplication.run(StatesRedistrictorApplication.class, args);

	}

}
