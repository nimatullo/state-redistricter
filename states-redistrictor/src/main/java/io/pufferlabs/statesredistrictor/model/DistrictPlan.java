package io.pufferlabs.statesredistrictor.model;

import io.pufferlabs.statesredistrictor.enums.PlanType;
import lombok.Data;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class DistrictPlan {
    @Field("id")
    private String id;
    private List<District> districts;
    private PlanType planType;
    private Overview overview;
    private String shape; //lmao
    private String description;
}
