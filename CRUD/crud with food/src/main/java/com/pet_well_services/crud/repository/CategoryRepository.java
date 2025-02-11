package com.pet_well_services.crud.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.pet_well_services.crud.entities.Category;


public interface CategoryRepository extends JpaRepository<Category,Long> {

    boolean existsByCategoryName(String categoryName);
    
}
