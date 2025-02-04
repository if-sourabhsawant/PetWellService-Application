package com.petwellservices.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petwellservices.api.entities.FoodShop;

public interface FoodShopRepository extends JpaRepository<FoodShop,Long>{

    List<FoodShop> findByCityCityId(Long cityId);

    List<FoodShop> findByAreaAreaId(Long areaId);
    
}
