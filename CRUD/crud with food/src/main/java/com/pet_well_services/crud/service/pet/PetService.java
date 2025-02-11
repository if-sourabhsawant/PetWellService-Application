
package com.pet_well_services.crud.service.pet;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pet_well_services.crud.entities.Category;
import com.pet_well_services.crud.entities.Pet;
import com.pet_well_services.crud.exception.ResourceNotFoundException;
import com.pet_well_services.crud.repository.CategoryRepository;
import com.pet_well_services.crud.repository.PetRepository;
import com.pet_well_services.crud.request.CreatePetRequest;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PetService implements IPetService {
    private final PetRepository petRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public Pet createPet(Pet pet) {

        return petRepository.save(pet);
    }

    @Override
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    @Override
    public Pet getPetById(Long petId) {
        return petRepository.findById(petId)
                .orElseThrow(() -> new RuntimeException("Pet not found with id: " + petId));
    }

    @Override
    public void deletePetById(Long petId) {
        if (!petRepository.existsById(petId)) {
            throw new ResourceNotFoundException("Pet not found with id: " + petId);
        }
        petRepository.deleteById(petId);
    }

    @Override
    public Pet getPetWithUserInfo(Long petId) {

        return petRepository.findById(petId)
                .orElseThrow(() -> new RuntimeException("Pet not found with id: " + petId));
    }

    @Override
    public Pet updatePet(Long petId, CreatePetRequest updatePetRequest) {
        
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new EntityNotFoundException("Pet not found with id: " + petId));

        
        pet.setPetName(updatePetRequest.getPetName());
        pet.setPetAge(updatePetRequest.getPetAge());

        
        Category category = categoryRepository.findById(updatePetRequest.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Category not found with id: " + updatePetRequest.getCategoryId()));
        pet.setCategory(category);

        

        
        return petRepository.save(pet);
    }
}
