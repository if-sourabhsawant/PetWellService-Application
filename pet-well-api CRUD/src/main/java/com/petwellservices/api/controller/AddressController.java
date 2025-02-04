package com.petwellservices.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petwellservices.api.dto.AreaDto;
import com.petwellservices.api.entities.Area;
import com.petwellservices.api.entities.FoodShop;
import com.petwellservices.api.entities.Groomer;
import com.petwellservices.api.entities.Sitter;
import com.petwellservices.api.entities.Veterinary;
import com.petwellservices.api.response.ApiResponse;
import com.petwellservices.api.service.IAreaService;
import com.petwellservices.api.service.ICityService;
import com.petwellservices.api.service.IFoodShopService;
import com.petwellservices.api.service.IGroomerService;
import com.petwellservices.api.service.ISitterService;
import com.petwellservices.api.service.VeterinaryService;
import com.petwellservices.api.util.Constants;

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
