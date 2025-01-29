package com.petwellservices.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petwellservices.api.dto.UserWithPetsDto;
import com.petwellservices.api.entities.Breed;
import com.petwellservices.api.entities.Category;
import com.petwellservices.api.response.ApiResponse;
import com.petwellservices.api.service.breed.IBreedService;
import com.petwellservices.api.service.category.ICategoryService;
import com.petwellservices.api.service.user.IUserService;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/pets")
public class PetController {
    final IUserService userService;
    final IBreedService breedService;
    final ICategoryService categoryService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse> getPetDetailsByUserId(@PathVariable Long userId) {
        try {
            UserWithPetsDto userWithPetsDtos = userService.getUserDetailsWithPets(userId);
            return ResponseEntity.ok(new ApiResponse("success", userWithPetsDtos));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse> getCategories() {
        try {
            List<Category> categories = categoryService.getAllCategories();
            return ResponseEntity.ok(new ApiResponse("success", categories));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    @GetMapping("/breeds")
    public ResponseEntity<ApiResponse> getBreeds() {
        try {
            List<Breed> breeds = breedService.getAllBreeds();
            return ResponseEntity.ok(new ApiResponse("success", breeds));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    @GetMapping("/categories-breeds")
    public ResponseEntity<ApiResponse> getCategoriesAndBreeds() {
        try {
            Map<String, Object> response = new HashMap<>();

            response.put("categories", categoryService.getAllCategories());
            response.put("breeds", breedService.getAllBreeds());

            return ResponseEntity.ok(new ApiResponse("success", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

}
