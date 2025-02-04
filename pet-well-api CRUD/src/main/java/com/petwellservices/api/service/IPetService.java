
package com.petwellservices.api.service;

import java.util.List;

import com.petwellservices.api.entities.Pet;
import com.petwellservices.api.request.CreatePetRequest;

public interface IPetService {
    Pet createPet(Pet pet);

    List<Pet> getAllPets();

    Pet getPetById(Long petId);

    void deletePetById(Long petId);

    Pet getPetWithUserInfo(Long petId);

    Pet updatePet(Long petId, CreatePetRequest updatePetRequest);
}
