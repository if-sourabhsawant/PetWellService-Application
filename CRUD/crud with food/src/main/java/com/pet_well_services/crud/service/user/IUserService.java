
package com.pet_well_services.crud.service.user;

import java.util.List;
import java.util.Optional;

import com.pet_well_services.crud.dto.AppointmentDto;
import com.pet_well_services.crud.dto.UserWithPetsDto;
import com.pet_well_services.crud.entities.Pet;
import com.pet_well_services.crud.entities.User;
import com.pet_well_services.crud.request.CreateUserRequest;

public interface IUserService {
    User createUser(CreateUserRequest request);

    List<User> getAllUsers();

    User getUserById(Long userId);

    User getUsersByRoleId(Long roleId);

    void deleteUserById(Long userId);

    User updateUser(Long userId, CreateUserRequest updateUserRequest);

    Optional<User> checkUserCredential(String email, String password);

    UserWithPetsDto getUserDetailsWithPets(Long userId);

    Pet addPetUnderUser(Long userId, Pet pet);

    List<AppointmentDto> getUserAppointments(Long userId);
}
