
package com.petwellservices.api.service.pet;

import java.util.List;

import org.springframework.stereotype.Service;

import com.petwellservices.api.entities.Pet;
import com.petwellservices.api.exception.ResourceNotFoundException;
import com.petwellservices.api.repository.PetRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PetService implements IPetService {
    private final PetRepository petRepository;

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
}
