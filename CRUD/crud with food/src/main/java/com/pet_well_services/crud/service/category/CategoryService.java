
package com.pet_well_services.crud.service.category;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pet_well_services.crud.entities.Category;
import com.pet_well_services.crud.exception.InvalidResourceException;
import com.pet_well_services.crud.exception.ResourceNotFoundException;
import com.pet_well_services.crud.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CategoryService implements ICategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public Category createCategory(Category category) {

        if (categoryRepository.existsByCategoryName(category.getCategoryName())) {
            throw new InvalidResourceException("Category already exists with name: " + category.getCategoryName());
        }
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));
    }

    @Override
    public void deleteCategoryById(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("Category not found with id: " + categoryId);
        }
        categoryRepository.deleteById(categoryId);
    }

    @Override
    public Category updateCategory(Long categoryId, String categoryName) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Not Found"));
        category.setCategoryName(categoryName);
        return categoryRepository.save(category);

    }
}
