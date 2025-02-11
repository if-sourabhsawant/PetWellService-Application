package com.pet_well_services.crud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pet_well_services.crud.entities.FoodShop;

public interface FoodShopRepository extends JpaRepository<FoodShop,Long>{

    List<FoodShop> findByCityCityId(Long cityId);

    List<FoodShop> findByAreaAreaId(Long areaId);
    
}
