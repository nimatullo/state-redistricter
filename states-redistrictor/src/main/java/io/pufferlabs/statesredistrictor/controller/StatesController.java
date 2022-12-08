package io.pufferlabs.statesredistrictor.controller;

import io.pufferlabs.statesredistrictor.enums.PlanType;
import io.pufferlabs.statesredistrictor.enums.Race;
import io.pufferlabs.statesredistrictor.model.Analysis;
import io.pufferlabs.statesredistrictor.model.DistrictPlan;
import io.pufferlabs.statesredistrictor.model.State;
import io.pufferlabs.statesredistrictor.service.StatesService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/states")
@CrossOrigin(value = "*")
public class StatesController {

    private final StatesService statesService;

    @Autowired
    public StatesController(StatesService statesService) {
        this.statesService = statesService;
    }

    @GetMapping
    public ResponseEntity<?> getStates() {
        return ResponseEntity.ok(statesService.getStates());
    }

    @GetMapping("/names")
    public ResponseEntity<?> getStateNames() {
        return ResponseEntity.ok(statesService.getStates().stream().map(State::getName));
    }

    @GetMapping("/{stateName}")
    public ResponseEntity<?> getStateByName(@PathVariable String stateName) {
        State state = statesService.getStateByName(stateName);
        state.setUniqueDistrictPlans(null);
        return ResponseEntity.ok(state);
    }

    @GetMapping("/{state}/shape")
    public ResponseEntity<?> getGeoJsonForState(@PathVariable String state) {
        return statesService.readGeoJsonFromDisk(state);
    }

    @GetMapping("/{stateName}/enacted")
    public ResponseEntity<?> getEnactedPlan(@PathVariable String stateName) {
        State state = statesService.getStateByName(stateName);
        return ResponseEntity.ok(state.getUniqueDistrictPlans().get(0));
    }

    @GetMapping("/{stateName}/unique-plans-brief")
    public ResponseEntity<?> getUniquePlansBrief(@PathVariable String stateName) {
        State state = statesService.getStateByName(stateName);
        List<DistrictPlan> plans = state.getUniqueDistrictPlans();
        // null all fields except for id and description
        plans = plans.stream().map(plan -> {
            DistrictPlan briefPlan = new DistrictPlan();
            briefPlan.setId(plan.getId());
            briefPlan.setPlanType(plan.getPlanType());
            briefPlan.setDescription(plan.getDescription());
            return briefPlan;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(plans);
    }

    @GetMapping("/{stateName}/unique-plans/{planId}")
    public ResponseEntity<?> getUniquePlans(@PathVariable String stateName, @PathVariable String planId) {
        State state = statesService.getStateByName(stateName);
        List<DistrictPlan> plans = state.getUniqueDistrictPlans();
        DistrictPlan plan = plans.stream().filter(p -> p.getId().equals(planId)).findFirst().orElse(null);
        return ResponseEntity.ok(plan);
    }

    @GetMapping("/{stateName}/unique-plans/geojson/{planType}/{description}")
    public ResponseEntity<?> getUniquePlansGeoJson(@PathVariable String stateName, @PathVariable String planType,
            @PathVariable String description) {
        return statesService.readUniquePlanGeoJsonFromDisk(stateName, description, PlanType.valueOf(planType));

    }

    @GetMapping("/{stateName}/ensemble-summaries")
    public ResponseEntity<?> getEnsembleSummaries(@PathVariable String stateName) {
        State state = statesService.getStateByName(stateName);
        return ResponseEntity.ok(state.getEnsembleSummaryData());
    }

    @GetMapping("/{stateName}/analysis")
    public ResponseEntity<?> getAnalysis(@PathVariable String stateName) {
        State state = statesService.getStateByName(stateName);
        return ResponseEntity.ok(state.getAnalyses());
    }

    @GetMapping("/{stateName}/{planType}/analysis/rep-dem-split")
    public ResponseEntity<?> getRepDemSplitAnalysis(@PathVariable String stateName, @PathVariable String planType) {
        State state = statesService.getStateByName(stateName);
        List<Integer> demRepSplitCounts = new ArrayList<>();
        if (planType.equals("SMD")) {
            // get SMD key value pair
            demRepSplitCounts = state.getAnalyses().get(PlanType.SMD).get(0).getDemRepSplitCounts();
        } else {
            List<Analysis> mmdAnalyses = state.getAnalyses().get(PlanType.MMD);
            List<List<Integer>> demRepSplitCountsList = mmdAnalyses.stream().map(Analysis::getDemRepSplitCounts)
                    .collect(Collectors.toList());
            // sum all the lists as far as the smallest list
            int minSize = demRepSplitCountsList.stream().mapToInt(List::size).min().getAsInt();
            for (int i = 0; i < minSize; i++) {
                int sum = 0;
                for (List<Integer> list : demRepSplitCountsList) {
                    sum += list.get(i);
                }
                demRepSplitCounts.add(sum);
            }
        }
        return ResponseEntity.ok(demRepSplitCounts);
    }

    @GetMapping("/{stateName}/{planType}/analysis/opp-reps")
    public ResponseEntity<?> getOpportunityRepAnalysis(@PathVariable String stateName, @PathVariable String planType) {
        State state = statesService.getStateByName(stateName);
        List<Integer> oppRepsCounts = new ArrayList<>();
        if (planType.equals("SMD")) {
            // get SMD key value pair
            oppRepsCounts = state.getAnalyses().get(PlanType.SMD).get(0).getOpportunityRepCounts();
        } else {
            List<Analysis> mmdAnalyses = state.getAnalyses().get(PlanType.MMD);
            List<List<Integer>> oppRepsCountsList = mmdAnalyses.stream().map(Analysis::getOpportunityRepCounts)
                    .collect(Collectors.toList());
            // sum all the lists as far as the smallest list
            int minSize = oppRepsCountsList.stream().mapToInt(List::size).min().getAsInt();
            for (int i = 0; i < minSize; i++) {
                int sum = 0;
                for (List<Integer> list : oppRepsCountsList) {
                    sum += list.get(i);
                }
                oppRepsCounts.add(sum);
            }
        }
        return ResponseEntity.ok(oppRepsCounts);
    }

    // @GetMapping("/{stateName}/{planType}/analysis/vote-seat-share")
    // public ResponseEntity<?> getVoteSeatShareAnalysis(@PathVariable String
    // stateName, @PathVariable String planType) {

    // }

    // get box and whisker plot data
    @GetMapping("/{stateName}/{planType}/{pattern}/analysis/box-whisker/{populationType}")
    public ResponseEntity<?> getBoxWhiskerAnalysis(@PathVariable String stateName, @PathVariable String planType,
            @PathVariable String pattern, @PathVariable String populationType) {
        State state = statesService.getStateByName(stateName);
        List<Analysis> analyses = state.getAnalyses().get(PlanType.valueOf(planType));
        if (planType.equals("MMD")) {
            analyses = analyses.stream().filter(a -> a.getPattern().equals(pattern)).collect(Collectors.toList());
        }
        Analysis analysis = analyses.get(0);
        Race race = Race.valueOf(populationType);
        Map<String, Map<String, Double>> boxData = analysis.getBoxAndWhiskerPlots().get(race);
        return ResponseEntity.ok(boxData);
    }

}
