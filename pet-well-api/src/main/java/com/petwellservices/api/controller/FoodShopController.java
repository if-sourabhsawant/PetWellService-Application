package com.petwellservices.api.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petwellservices.api.entities.FoodShop;
import com.petwellservices.api.response.ApiResponse;
import com.petwellservices.api.service.foodshop.IFoodShopService;

import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/food-shops")
public class FoodShopController {
    
    final IFoodShopService foodShopService;

    public ResponseEntity<ApiResponse> getFoodShops() {
        try {
            List<FoodShop> foodShops = foodShopService.getAllFoodShops();
            return ResponseEntity.ok(new ApiResponse("success", foodShops));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }


    @GetMapping("/{foodShopId}")
    public ResponseEntity<ApiResponse> getFoodShops(@PathVariable Long foodShopId) {
        try {
           FoodShop foodShops = foodShopService.getFoodShopById(foodShopId);
            return ResponseEntity.ok(new ApiResponse("success", foodShops));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }
}
