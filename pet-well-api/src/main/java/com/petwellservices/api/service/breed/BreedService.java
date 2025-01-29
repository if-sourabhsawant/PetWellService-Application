
package com.petwellservices.api.service.breed;

import java.util.List;

import org.springframework.stereotype.Service;

import com.petwellservices.api.entities.Breed;
import com.petwellservices.api.exception.ResourceNotFoundException;
import com.petwellservices.api.repository.BreedRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BreedService implements IBreedService {
    
    private final BreedRepository breedRepository;
    @Override
    public Breed createBreed(Breed breed) {
        if (breedRepository.existsByBreedName(breed.getBreedName())) {
            throw new RuntimeException("Breed already exists with name: " + breed.getBreedName());
        }
        return breedRepository.save(breed);
    }

    @Override
    public List<Breed> getAllBreeds() {
        return breedRepository.findAll();
    }

    @Override
    public Breed getBreedById(Long breedId) {
        return breedRepository.findById(breedId)
                .orElseThrow(() -> new RuntimeException("Breed not found with id: " + breedId));
    }

    @Override
    public void deleteBreedById(Long breedId) {
        if (!breedRepository.existsById(breedId)) {
            throw new RuntimeException("Breed not found with id: " + breedId);
        }
        breedRepository.deleteById(breedId);
    }

    @Override
    public Breed updateBreed(Long breedId, String breedName) {
        Breed breed =  breedRepository.findById(breedId).orElseThrow(()->new ResourceNotFoundException("Not Found"));
        breed.setBreedName(breedName);
        return breedRepository.save(breed);
    }
}
