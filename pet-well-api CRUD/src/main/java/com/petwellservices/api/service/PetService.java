
package com.petwellservices.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.petwellservices.api.entities.Breed;
import com.petwellservices.api.entities.Category;
import com.petwellservices.api.entities.Pet;
import com.petwellservices.api.exception.ResourceNotFoundException;
import com.petwellservices.api.repository.BreedRepository;
import com.petwellservices.api.repository.CategoryRepository;
import com.petwellservices.api.repository.PetRepository;
import com.petwellservices.api.request.CreatePetRequest;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PetService implements IPetService {
    private final PetRepository petRepository;
    private final CategoryRepository categoryRepository;
    private final BreedRepository breedRepository;

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

        Breed breed = breedRepository.findById(updatePetRequest.getBreedId())
                .orElseThrow(
                        () -> new EntityNotFoundException("Breed not found with id: " + updatePetRequest.getBreedId()));
        pet.setBreed(breed);

        
        return petRepository.save(pet);
    }
}
