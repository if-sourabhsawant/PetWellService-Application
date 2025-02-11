package com.pet_well_services.crud.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pet_well_services.crud.dto.UserWithPetsDto;
import com.pet_well_services.crud.entities.Category;
import com.pet_well_services.crud.entities.Pet;
import com.pet_well_services.crud.request.CreatePetRequest;
import com.pet_well_services.crud.response.ApiResponse;
import com.pet_well_services.crud.service.category.ICategoryService;
import com.pet_well_services.crud.service.pet.IPetService;
import com.pet_well_services.crud.service.user.IUserService;
import com.pet_well_services.crud.util.Constants;

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

    @GetMapping("/categories-breeds")
    public ResponseEntity<ApiResponse> getCategoriesAndBreeds() {
        try {
            Map<String, Object> response = new HashMap<>();

            response.put("categories", categoryService.getAllCategories());
           

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
