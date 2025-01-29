package com.petwellservices.api.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.petwellservices.api.entities.Category;


public interface CategoryRepository extends JpaRepository<Category,Long> {

    boolean existsByCategoryName(String categoryName);
    
}
