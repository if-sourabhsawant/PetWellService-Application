
package com.pet_well_services.crud.service.category;

import java.util.List;

import com.pet_well_services.crud.entities.Category;

public interface ICategoryService {
    Category createCategory(Category category);

    List<Category> getAllCategories();

    Category getCategoryById(Long categoryId);

    void deleteCategoryById(Long categoryId);

    Category updateCategory(Long categoryId, String categoryName);
}
