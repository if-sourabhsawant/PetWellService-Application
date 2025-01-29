package com.petwellservices.api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.petwellservices.api.dto.GroomerDto;
import com.petwellservices.api.dto.SitterDto;
import com.petwellservices.api.dto.UserWithPetsDto;
import com.petwellservices.api.dto.VeterinaryDto;
import com.petwellservices.api.entities.Breed;
import com.petwellservices.api.entities.Category;
import com.petwellservices.api.entities.FoodShop;
import com.petwellservices.api.entities.Pet;
import com.petwellservices.api.entities.User;
import com.petwellservices.api.enums.UserStatus;
import com.petwellservices.api.request.LoginRequest;
import com.petwellservices.api.response.ApiResponse;
import com.petwellservices.api.service.breed.IBreedService;
import com.petwellservices.api.service.category.ICategoryService;
import com.petwellservices.api.service.foodshop.IFoodShopService;
import com.petwellservices.api.service.groomer.IGroomerService;
import com.petwellservices.api.service.pet.IPetService;
import com.petwellservices.api.service.sitter.ISitterService;
import com.petwellservices.api.service.user.IUserService;
import com.petwellservices.api.service.veterinary.IVeterinaryService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/admin")
public class AdminController {

    private final IUserService userService;

    private final IVeterinaryService veterinaryService;

    private final ISitterService sitterService;

    private final IGroomerService groomerService;

    private final IFoodShopService foodShopService;

    private final IPetService petService;

    private final ICategoryService categoryService;

    private final IBreedService breedService;

    @GetMapping("/users")
    public ResponseEntity<ApiResponse> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(new ApiResponse("success", users));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }

    }
    @GetMapping("/users/{userId}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable Long userId) {
        try {
            UserWithPetsDto users = userService.getUserDetailsWithPets(userId);
            return ResponseEntity.ok(new ApiResponse("success", users));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }

    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long id) {

        try {
            userService.deleteUserById(id);
            return ResponseEntity.ok(new ApiResponse("success", "User Deleted Successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    @GetMapping("/veterinarians/status/{status}")
    public ResponseEntity<ApiResponse> getVeterinariesByStatus(@PathVariable UserStatus status) {
        try {
            List<VeterinaryDto> veterinarians = veterinaryService.getVeterinariesByStatus(status);
            return ResponseEntity.ok(new ApiResponse("success", veterinarians));
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    // @GetMapping("/veterinarians/{veterinaryId}")
    // public ResponseEntity<ApiResponse> getVeterinariesByStatus(@PathVariable Long veterinaryId) {
    //     try {
    //        VeterinaryDto veterinarians = veterinaryService.getVeterinaryById(veterinaryId);
    //         return ResponseEntity.ok(new ApiResponse("success", veterinarians));
            
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //                 .body(new ApiResponse("error", e.getMessage()));
    //     }
    // }

    @PutMapping("/veterinarians/{id}/status")
    public ResponseEntity<ApiResponse> updateVeterinaryStatus(@PathVariable Long id, @RequestParam UserStatus status) {

        try {
            veterinaryService.updateRequestStatus(id, status);
            return ResponseEntity.ok(new ApiResponse("success", "Status Update Successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }

    }

    @DeleteMapping("/veterinarians/{id}")
    public ResponseEntity<ApiResponse> deleteVeterinary(@PathVariable Long id) {

        try {
            veterinaryService.deleteVeterinary(id);
            return ResponseEntity.ok(new ApiResponse("success", "veterinarians Deleted"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }

    }

    @GetMapping("/sitters/status/{status}")
    public ResponseEntity<ApiResponse> getSittersByStatus(@PathVariable UserStatus status) {
        try {
            List<SitterDto> sitters = sitterService.getSitterByStatus(status);
            return ResponseEntity.ok(new ApiResponse("success", sitters));
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    @PutMapping("/sitters/{id}/status")
    public ResponseEntity<ApiResponse> updateSitterStatus(@PathVariable Long id, @RequestParam UserStatus status) {

        try {
            sitterService.updateRequestStatus(id, status);
            return ResponseEntity.ok(new ApiResponse("success", "Status Update Successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    @DeleteMapping("/sitters/{id}")
    public ResponseEntity<ApiResponse> deleteSitter(@PathVariable Long id) {

        try {
            sitterService.deleteSitter(id);
            return ResponseEntity.ok(new ApiResponse("success", "sitters Deleted"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }


    @GetMapping("/groomer/status/{status}")
    public ResponseEntity<ApiResponse> getGroomerByStatus(@PathVariable UserStatus status) {
        try {
            List<GroomerDto> groomers = groomerService.getGroomersByStatus(status);
            return ResponseEntity.ok(new ApiResponse("success", groomers));
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    @PutMapping("/groomers/{id}/status")
    public ResponseEntity<ApiResponse> updateGroomerStatus(@PathVariable Long id, @RequestParam String status) {

        try {
            groomerService.updateGroomerStatus(id, status);
            return ResponseEntity.ok(new ApiResponse("success", "Status Update Successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }

    }

    @DeleteMapping("/groomers/{id}")
    public ResponseEntity<ApiResponse> deleteGroomer(@PathVariable Long id) {

        try {
            groomerService.deleteGroomer(id);
            return ResponseEntity.ok(new ApiResponse("success", "Delete Successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    // ----------------- Food Shop Endpoints -----------------

    @PostMapping("/food-shops")
    public ResponseEntity<ApiResponse> createFoodShop(@RequestBody FoodShop foodShop) {

        try {

            FoodShop createdFoodShop = foodShopService.createFoodShop(foodShop);
            return ResponseEntity.ok(new ApiResponse("success", createdFoodShop));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    @DeleteMapping("/food-shops/{id}")
    public ResponseEntity<ApiResponse> deleteFoodShop(@PathVariable Long id) {

        try {
            foodShopService.deleteFoodShopById(id);
            return ResponseEntity.ok(new ApiResponse("success", "deleted Successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    // ----------------- Pet Endpoints -----------------

    @GetMapping("/pets")
    public ResponseEntity<ApiResponse> getAllPets() {
        try {
            List<Pet> pets = petService.getAllPets();
            return ResponseEntity.ok(new ApiResponse("success", pets));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    @PostMapping("/categories")
    public ResponseEntity<ApiResponse> createCategory(@RequestBody Category category) {

        try {
            Category createdCategory = categoryService.createCategory(category);
            return ResponseEntity.ok(new ApiResponse("success", createdCategory));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<ApiResponse> updateCategoryName(@PathVariable Long id, @RequestParam String newName) {

        try {
            Category updatedCategory = categoryService.updateCategory(id, newName);
            return ResponseEntity.ok(new ApiResponse("success", updatedCategory));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<ApiResponse> deleteCategory(@PathVariable Long id) {

        try {
            categoryService.deleteCategoryById(id);
            return ResponseEntity.ok(new ApiResponse("success", "Deleted Successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }

    }

    @PostMapping("/breeds")
    public ResponseEntity<ApiResponse> createBreed(@RequestBody Breed breed) {

        try {
            Breed createdBreed = breedService.createBreed(breed);
            return ResponseEntity.ok(new ApiResponse("success", createdBreed));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }

    }

    @PutMapping("/breeds/{id}")
    public ResponseEntity<ApiResponse> updateBreedName(@PathVariable Long id, @RequestParam String newName) {
        try {
            Breed updatedBreed = breedService.updateBreed(id, newName);
            return ResponseEntity.ok(new ApiResponse("success", updatedBreed));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    @DeleteMapping("/breeds/{id}")
    public ResponseEntity<ApiResponse> deleteBreed(@PathVariable Long id) {

        try {
            breedService.deleteBreedById(id);
            return ResponseEntity.ok(new ApiResponse("success", "Deleted Successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> loginUser(@RequestBody LoginRequest request) {

        try {
            Optional<User> userOptional = userService.checkUserCredential(request.getEmail(),
                    request.getPassword());

            if (userOptional.isPresent()) {
                User user = userOptional.get();

                if (user.getRole().getRoleName().equals("ROLE_ADMIN")) {

                    return ResponseEntity.ok(new ApiResponse("success", user));
                }

            }

            // Return error response if credentials are invalid
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("error", "Invalid email or password"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", "Invalid email or password"));
        }
    }
}
