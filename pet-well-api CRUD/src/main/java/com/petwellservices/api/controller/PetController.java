package com.petwellservices.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petwellservices.api.dto.UserWithPetsDto;
import com.petwellservices.api.entities.Breed;
import com.petwellservices.api.entities.Category;
import com.petwellservices.api.entities.Pet;
import com.petwellservices.api.request.CreatePetRequest;
import com.petwellservices.api.response.ApiResponse;
import com.petwellservices.api.service.IBreedService;
import com.petwellservices.api.service.ICategoryService;
import com.petwellservices.api.service.IPetService;
import com.petwellservices.api.service.IUserService;
import com.petwellservices.api.util.Constants;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RequiredArgsConstructor
@RestController
@RequestMapping("/pets")
public class PetController {
    final IUserService userService;
    final IBreedService breedService;
    final ICategoryService categoryService;
    final IPetService petService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse> getPetDetailsByUserId(@PathVariable Long userId) {
        try {
            UserWithPetsDto userWithPetsDtos = userService.getUserDetailsWithPets(userId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, userWithPetsDtos));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse> getCategories() {
        try {
            List<Category> categories = categoryService.getAllCategories();
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, categories));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/breeds")
    public ResponseEntity<ApiResponse> getBreeds() {
        try {
            List<Breed> breeds = breedService.getAllBreeds();
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, breeds));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/categories-breeds")
    public ResponseEntity<ApiResponse> getCategoriesAndBreeds() {
        try {
            Map<String, Object> response = new HashMap<>();

            response.put("categories", categoryService.getAllCategories());
            response.put("breeds", breedService.getAllBreeds());

            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @PutMapping("/{petId}")
    public ResponseEntity<ApiResponse> updatePet(@PathVariable Long petId,
            @RequestBody @Valid CreatePetRequest updatePetRequest) {
        try {

            Pet updatedPet = petService.updatePet(petId, updatePetRequest);

            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, updatedPet));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }

    }

}
