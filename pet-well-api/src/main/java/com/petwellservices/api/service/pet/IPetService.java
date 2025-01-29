
package com.petwellservices.api.service.pet;

import java.util.List;

import com.petwellservices.api.entities.Pet;

public interface IPetService {
    Pet createPet(Pet pet);

    List<Pet> getAllPets();

    Pet getPetById(Long petId);

    void deletePetById(Long petId);

    Pet getPetWithUserInfo(Long petId);
}
