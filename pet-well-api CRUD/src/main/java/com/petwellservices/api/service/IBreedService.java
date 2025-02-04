
package com.petwellservices.api.service;

import java.util.List;

import com.petwellservices.api.entities.Breed;

public interface IBreedService {
    Breed createBreed(Breed breed);

    List<Breed> getAllBreeds();

    Breed getBreedById(Long breedId);

    void deleteBreedById(Long breedId);

    Breed updateBreed(Long breedId, String breedName);
}
