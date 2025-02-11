package com.pet_well_services.crud.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pet_well_services.crud.dto.AreaDto;
import com.pet_well_services.crud.entities.Area;
import com.pet_well_services.crud.entities.FoodShop;
import com.pet_well_services.crud.entities.Groomer;
import com.pet_well_services.crud.entities.Sitter;
import com.pet_well_services.crud.entities.Veterinary;
import com.pet_well_services.crud.response.ApiResponse;
import com.pet_well_services.crud.service.area.IAreaService;
import com.pet_well_services.crud.service.city.ICityService;
import com.pet_well_services.crud.service.foodshop.IFoodShopService;
import com.pet_well_services.crud.service.groomer.IGroomerService;
import com.pet_well_services.crud.service.sitter.ISitterService;
import com.pet_well_services.crud.service.veterinary.VeterinaryService;
import com.pet_well_services.crud.util.Constants;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RequiredArgsConstructor
@RestController
@RequestMapping("/address")
public class AddressController {
    final IAreaService areaService;
    final ICityService cityService;
    final VeterinaryService veterinaryService;

    final IGroomerService groomerService;

    final ISitterService sitterService;

    final IFoodShopService foodShopService;

    @GetMapping("/cities-areas")
    public ResponseEntity<ApiResponse> getCitiesAreas() {
        try {
            Map<String, Object> response = new HashMap<>();
            response.put("cities", cityService.getCities());

            List<Area> areas = areaService.getAreas();

            List<AreaDto> dto = areas.stream()
                    .map(this::convertAreaToDto).toList();
            response.put("areas", dto);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));

        }
    }

    public AreaDto convertAreaToDto(Area area) {
        AreaDto dto = new AreaDto();
        dto.setAreaId(area.getAreaId());
        dto.setAreaName(area.getAreaName());
        dto.setCityId(area.getCity().getCityId());
        return dto;
    }

    @GetMapping("/veterinaries/city/{cityId}")
    public ResponseEntity<ApiResponse> getVeterinariesByCityId(@PathVariable Long cityId) {
        try {
            List<Veterinary> veterinarians = veterinaryService.getVeterinariesByCityId(cityId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, veterinarians));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/veterinaries/area/{areaId}")
    public ResponseEntity<ApiResponse> getVeterinariesByAreaId(@PathVariable Long areaId) {
        try {
            List<Veterinary> veterinarians = veterinaryService.getVeterinariesByAreaId(areaId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, veterinarians));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/groomers/city/{cityId}")
    public ResponseEntity<ApiResponse> getGroomersByCityId(@PathVariable Long cityId) {
        try {
            List<Groomer> groomers = groomerService.getGroomersByCityId(cityId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, groomers));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/groomers/area/{areaId}")
    public ResponseEntity<ApiResponse> getGroomersByAreaId(@PathVariable Long areaId) {
        try {
            List<Groomer> groomers = groomerService.getGroomersByAreaId(areaId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, groomers));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/sitters/city/{cityId}")
    public ResponseEntity<ApiResponse> getSittersByCityId(@PathVariable Long cityId) {
        try {
            List<Sitter> sitters = sitterService.getSittersByCityId(cityId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, sitters));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/sitters/area/{areaId}")
    public ResponseEntity<ApiResponse> getSittersByAreaId(@PathVariable Long areaId) {
        try {
            List<Sitter> sitters = sitterService.getSittersByAreaId(areaId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, sitters));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/food-shops/city/{cityId}")
    public ResponseEntity<ApiResponse> getFoodShopsByCityId(@PathVariable Long cityId) {
        try {
            List<FoodShop> foodShops = foodShopService.getFoodShopsByCityId(cityId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, foodShops));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/food-shops/area/{areaId}")
    public ResponseEntity<ApiResponse> getFoodShopsByAreaId(@PathVariable Long areaId) {
        try {
            List<FoodShop> foodShops = foodShopService.getFoodShopsByAreaId(areaId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, foodShops));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }
}
