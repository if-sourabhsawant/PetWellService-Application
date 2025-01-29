
package com.petwellservices.api.service.breed;

import java.util.List;
import java.util.Locale.Category;

import com.petwellservices.api.entities.Breed;

public interface IBreedService {
    Breed createBreed(Breed breed);
    List<Breed> getAllBreeds();
    Breed getBreedById(Long breedId);
    void deleteBreedById(Long breedId);
    Breed updateBreed(Long breedId,String breedName );
}
