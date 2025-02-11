package com.pet_well_services.crud.controller;

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

import com.pet_well_services.crud.dto.GroomerDto;
import com.pet_well_services.crud.dto.SitterDto;
import com.pet_well_services.crud.dto.UserWithPetsDto;
import com.pet_well_services.crud.dto.VeterinaryDto;
import com.pet_well_services.crud.entities.Area;
import com.pet_well_services.crud.entities.Category;
import com.pet_well_services.crud.entities.City;
import com.pet_well_services.crud.entities.FoodShop;
import com.pet_well_services.crud.entities.Pet;
import com.pet_well_services.crud.entities.User;
import com.pet_well_services.crud.enums.UserStatus;
import com.pet_well_services.crud.request.CreateFoodShopRequest;
import com.pet_well_services.crud.request.LoginRequest;
import com.pet_well_services.crud.response.ApiResponse;
import com.pet_well_services.crud.service.area.IAreaService;
import com.pet_well_services.crud.service.category.ICategoryService;
import com.pet_well_services.crud.service.city.ICityService;
import com.pet_well_services.crud.service.foodshop.IFoodShopService;
import com.pet_well_services.crud.service.groomer.IGroomerService;
import com.pet_well_services.crud.service.pet.IPetService;
import com.pet_well_services.crud.service.sitter.ISitterService;
import com.pet_well_services.crud.service.user.IUserService;
import com.pet_well_services.crud.service.veterinary.IVeterinaryService;
import com.pet_well_services.crud.util.Constants;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/admin")
public class AdminController {

    private final IUserService userService;

    private final IVeterinaryService veterinaryService;

    private final ISitterService sitterService;

    private final IGroomerService groomerService;

    private final IFoodShopService foodShopService;

    private final IPetService petService;

    private final ICategoryService categoryService;

    private final ICityService cityService;
    private final IAreaService areaService;

    @GetMapping("/users")
    public ResponseEntity<ApiResponse> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, users));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }

    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable Long userId) {
        try {
            UserWithPetsDto users = userService.getUserDetailsWithPets(userId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, users));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }

    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long id) {

        try {
            userService.deleteUserById(id);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, "User Deleted Successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/veterinarians/status/{status}")
    public ResponseEntity<ApiResponse> getVeterinariesByStatus(@PathVariable UserStatus status) {
        try {
            List<VeterinaryDto> veterinarians = veterinaryService.getVeterinariesByStatus(status);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, veterinarians));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @PutMapping("/veterinarians/{id}/status")
    public ResponseEntity<ApiResponse> updateVeterinaryStatus(@PathVariable Long id, @RequestParam UserStatus status) {

        try {
            veterinaryService.updateRequestStatus(id, status);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, Constants.SUCCESS_UPDATE));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }

    }

    @DeleteMapping("/veterinarians/{id}")
    public ResponseEntity<ApiResponse> deleteVeterinary(@PathVariable Long id) {

        try {
            veterinaryService.deleteVeterinary(id);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, "veterinarians Deleted"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }

    }

    @GetMapping("/sitters/status/{status}")
    public ResponseEntity<ApiResponse> getSittersByStatus(@PathVariable UserStatus status) {
        try {
            List<SitterDto> sitters = sitterService.getSitterByStatus(status);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, sitters));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @PutMapping("/sitters/{id}/status")
    public ResponseEntity<ApiResponse> updateSitterStatus(@PathVariable Long id, @RequestParam UserStatus status) {

        try {
            sitterService.updateRequestStatus(id, status);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS,  Constants.SUCCESS_UPDATE));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @DeleteMapping("/sitters/{id}")
    public ResponseEntity<ApiResponse> deleteSitter(@PathVariable Long id) {

        try {
            sitterService.deleteSitter(id);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, "sitters Deleted"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/groomer/status/{status}")
    public ResponseEntity<ApiResponse> getGroomerByStatus(@PathVariable UserStatus status) {
        try {
            List<GroomerDto> groomers = groomerService.getGroomersByStatus(status);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, groomers));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @PutMapping("/groomers/{id}/status")
    public ResponseEntity<ApiResponse> updateGroomerStatus(@PathVariable Long id, @RequestParam String status) {

        try {
            groomerService.updateGroomerStatus(id, status);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS,  Constants.SUCCESS_UPDATE));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }

    }

    @DeleteMapping("/groomers/{id}")
    public ResponseEntity<ApiResponse> deleteGroomer(@PathVariable Long id) {

        try {
            groomerService.deleteGroomer(id);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, "Delete Successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    

    @PostMapping("/food-shops")
    public ResponseEntity<ApiResponse> createFoodShop(@RequestBody CreateFoodShopRequest foodShop) {

        try {
            City city = cityService.getCityById(foodShop.getCityId());
            Area area = areaService.getAreaById(foodShop.getAreaId());
            FoodShop createdFoodShop = foodShopService.createFoodShop(foodShop, city, area);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, createdFoodShop));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @PutMapping("/food-shops/{shopId}")
    public ResponseEntity<ApiResponse> updateFoodShop(
            @PathVariable Long shopId,
            @RequestBody @Valid CreateFoodShopRequest updateFoodShopRequest) {
        try {
            FoodShop updatedFoodShop = foodShopService.updateFoodShop(shopId, updateFoodShopRequest);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, updatedFoodShop));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @DeleteMapping("/food-shops/{id}")
    public ResponseEntity<ApiResponse> deleteFoodShop(@PathVariable Long id) {

        try {
            foodShopService.deleteFoodShopById(id);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, "deleted Successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    

    @GetMapping("/pets")
    public ResponseEntity<ApiResponse> getAllPets() {
        try {
            List<Pet> pets = petService.getAllPets();
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, pets));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @PostMapping("/categories")
    public ResponseEntity<ApiResponse> createCategory(@RequestBody Category category) {

        try {
            Category createdCategory = categoryService.createCategory(category);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, createdCategory));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<ApiResponse> updateCategoryName(@PathVariable Long id, @RequestParam String newName) {

        try {
            Category updatedCategory = categoryService.updateCategory(id, newName);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, updatedCategory));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
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

                    return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, user));
                }

            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(Constants.ERROR, "Invalid email or password"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, "Invalid email or password"));
        }
    }
}
