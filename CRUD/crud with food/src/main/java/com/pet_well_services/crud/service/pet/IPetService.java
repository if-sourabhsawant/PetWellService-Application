
package com.pet_well_services.crud.service.pet;

import java.util.List;

import com.pet_well_services.crud.entities.Pet;
import com.pet_well_services.crud.request.CreatePetRequest;

public interface IPetService {
    Pet createPet(Pet pet);

    List<Pet> getAllPets();

    Pet getPetById(Long petId);

    void deletePetById(Long petId);

    Pet getPetWithUserInfo(Long petId);

    Pet updatePet(Long petId, CreatePetRequest updatePetRequest);
}
