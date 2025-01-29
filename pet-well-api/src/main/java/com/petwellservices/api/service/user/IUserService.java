
package com.petwellservices.api.service.user;

import java.util.List;
import java.util.Optional;

import com.petwellservices.api.dto.AppointmentDto;
import com.petwellservices.api.dto.UserWithPetsDto;
import com.petwellservices.api.entities.Pet;
import com.petwellservices.api.entities.User;
import com.petwellservices.api.request.CreateUserRequest;

public interface IUserService {
    User createUser(CreateUserRequest request);
    List<User> getAllUsers();
    User getUserById(Long userId);
    User getUsersByRoleId(Long roleId);
    void deleteUserById(Long userId);


    Optional<User> checkUserCredential(String email, String password);
    UserWithPetsDto getUserDetailsWithPets(Long userId);

    Pet addPetUnderUser(Long userId, Pet pet);
    List<AppointmentDto> getUserAppointments(Long userId);
}
