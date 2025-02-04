
package com.petwellservices.api.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.petwellservices.api.dto.AppointmentDto;
import com.petwellservices.api.dto.PetDto;
import com.petwellservices.api.dto.UserWithPetsDto;
import com.petwellservices.api.entities.Area;
import com.petwellservices.api.entities.Breed;
import com.petwellservices.api.entities.Category;
import com.petwellservices.api.entities.City;
import com.petwellservices.api.entities.Groomer;
import com.petwellservices.api.entities.Pet;
import com.petwellservices.api.entities.Role;
import com.petwellservices.api.entities.Sitter;
import com.petwellservices.api.entities.User;
import com.petwellservices.api.entities.Veterinary;
import com.petwellservices.api.enums.UserStatus;
import com.petwellservices.api.exception.ResourceNotFoundException;
import com.petwellservices.api.repository.AreaRepository;
import com.petwellservices.api.repository.BreedRepository;
import com.petwellservices.api.repository.CategoryRepository;
import com.petwellservices.api.repository.CityRepository;
import com.petwellservices.api.repository.GroomerAppointmentRepository;
import com.petwellservices.api.repository.GroomerRepository;
import com.petwellservices.api.repository.PetRepository;
import com.petwellservices.api.repository.RoleRepository;
import com.petwellservices.api.repository.SitterAppointmentRepository;
import com.petwellservices.api.repository.SitterRepository;
import com.petwellservices.api.repository.UserRepository;
import com.petwellservices.api.repository.VeterinaryAppointmentRepository;
import com.petwellservices.api.repository.VeterinaryRepository;
import com.petwellservices.api.request.CreateGroomerRequest;
import com.petwellservices.api.request.CreatePetRequest;
import com.petwellservices.api.request.CreateSitterRequest;
import com.petwellservices.api.request.CreateUserRequest;
import com.petwellservices.api.request.CreateVeterinaryRequest;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CityRepository cityRepository;
    private final AreaRepository areaRepository;
    private final VeterinaryRepository veterinaryRepository;
    private final SitterRepository sitterRepository;
    private final GroomerRepository groomerRepository;
    private final CategoryRepository categoryRepository;
    private final BreedRepository breedRepository;
    private final PetRepository petRepository;
    private final ModelMapper modelMapper;

    private final VeterinaryAppointmentRepository veterinaryAppointmentRepository;

    private final SitterAppointmentRepository sitterAppointmentRepository;

    private final GroomerAppointmentRepository groomerAppointmentRepository;

    @Transactional
    @Override
    public User createUser(CreateUserRequest request) {
        int roleId = request.getRoleId().intValue();
        petRepository.count();
        User user = createNormalUser(request);
        switch (roleId) {
            case 1:
                return createUserWithPet(user, request.getPet());

            case 2:
                return createVeterinaryUser(user, request.getVeterinary());

            case 3:
                return createSitterUser(user, request.getSitter());

            case 4:
                return createGroomerUser(user, request.getGroomer());

            default:
                throw new ResourceNotFoundException("In-valid Role");
        }
    }

    private User createVeterinaryUser(User user, CreateVeterinaryRequest veterinaryRequest) {
        Veterinary veterinary = new Veterinary();
        veterinary.setUser(user);
        veterinary.setSpecialization(veterinaryRequest.getSpecialization());
        veterinary.setExperience(veterinaryRequest.getExperience());
        veterinary.setLicenseNo(veterinaryRequest.getLicenseNo());
        veterinary.setClinicName(veterinaryRequest.getClinicName());
        veterinary.setClinicAddress(veterinaryRequest.getClinicAddress());
        veterinary.setClinicPhoneNo(veterinaryRequest.getClinicPhoneNo());
        veterinary.setNoOfSlots(veterinaryRequest.getNoOfSlots());
        veterinary.setStatus(UserStatus.PENDING);
        City cityV = cityRepository.findById(veterinaryRequest.getCityId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid City"));
        veterinary.setCity(cityV);

        Area areaV = areaRepository.findById(veterinaryRequest.getAreaId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Area"));
        veterinary.setArea(areaV);

        veterinaryRepository.save(veterinary);
        return user;
    }

    private User createUserWithPet(User user, CreatePetRequest petRequest) {
        Pet pet = new Pet();
        pet.setPetName(petRequest.getPetName());
        pet.setPetAge(petRequest.getPetAge());
        Category category = categoryRepository.findById(petRequest.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid category"));
        pet.setCategory(category);
        Breed breed = breedRepository.findById(petRequest.getBreedId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Breed"));
        pet.setBreed(breed);
        pet.setUser(user);
        petRepository.save(pet);
        return user;

    }

    private User createGroomerUser(User user, CreateGroomerRequest groomerRequest) {

        Groomer groomer = new Groomer();
        groomer.setUser(user);
        groomer.setShopName(groomerRequest.getShopName());
        groomer.setRating(5);
        groomer.setShopPhoneNo(groomerRequest.getShopPhoneNo());
        groomer.setShopAddress(groomerRequest.getShopAddress());
        groomer.setNoOfSlots(groomerRequest.getNoOfSlots());
        groomer.setStatus(UserStatus.PENDING);
        City cityV = cityRepository.findById(groomerRequest.getCityId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid City"));
        groomer.setCity(cityV);

        Area areaV = areaRepository.findById(groomerRequest.getAreaId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Area"));
        groomer.setArea(areaV);

        groomerRepository.save(groomer);
        return user;
    }

    private User createSitterUser(User user, CreateSitterRequest sitterRequest) {
        Sitter sitter = new Sitter();
        sitter.setUser(user);
        sitter.setRating(5);
        City cityV = cityRepository.findById(sitterRequest.getCityId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid City"));
        sitter.setCity(cityV);

        Area areaV = areaRepository.findById(sitterRequest.getAreaId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Area"));
        sitter.setArea(areaV);
        sitter.setCenterPhoneNo(sitterRequest.getCenterPhoneNo());
        sitter.setCenterAddress(sitterRequest.getCenterAddress());
        sitter.setNoOfSlots(sitterRequest.getNoOfSlots());
        sitter.setStatus(UserStatus.PENDING);
        sitterRepository.save(sitter);
        return user;
    }

    User createNormalUser(CreateUserRequest request) {
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhoneNo(request.getPhoneNo());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setAadharNo(request.getAadharNo());
        user.setAddress(request.getAddress());

        City city = cityRepository.findById(request.getCityId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid City"));
        user.setCity(city);

        Area area = areaRepository.findById(request.getAreaId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Area"));
        user.setArea(area);

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Role"));
        user.setRole(role);

        return userRepository.save(user);
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId).get();
    }

    @Override
    public User getUsersByRoleId(Long roleId) {

        throw new UnsupportedOperationException("Unimplemented method 'getUsersByRoleId'");
    }

    @Transactional
    @Override
    public void deleteUserById(Long userId) {
        petRepository.deleteByUserUserId(userId);
        userRepository.deleteById(userId);
    }

    @Override
    public Optional<User> checkUserCredential(String email, String password) {

        return userRepository.findByEmailAndPassword(email, password);
    }

    @Override
    public UserWithPetsDto getUserDetailsWithPets(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
        UserWithPetsDto userDto;

        userDto = modelMapper.map(user, UserWithPetsDto.class);
        List<PetDto> petDtos = petRepository.findByUserUserId(userId).stream().map(this::convertToDto).toList();
        userDto.setPets(petDtos);

        return userDto;

    }

    PetDto convertToDto(Pet pet) {
        PetDto petDto = new PetDto();
        petDto.setPetId(pet.getPetId());
        petDto.setPetName(pet.getPetName());
        petDto.setPetAge(pet.getPetAge());
        petDto.setUserName(pet.getUser().getFirstName() + " " + pet.getUser().getLastName());
        petDto.setBreed(pet.getBreed());
        petDto.setCategory(pet.getCategory());
        return petDto;
    }

    @Override
    public Pet addPetUnderUser(Long userId, Pet pet) {

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            pet.setUser(user);
            return petRepository.save(pet);
        }
        throw new ResourceNotFoundException("User not found with id: " + userId);
    }

    @Override
    public List<AppointmentDto> getUserAppointments(Long userId) {
        List<AppointmentDto> veterinaryAppointments = veterinaryAppointmentRepository.findByUserUserId(userId)
                .stream().map(AppointmentDto::fromVeterinaryAppointment).collect(Collectors.toList());

        List<AppointmentDto> sitterAppointments = sitterAppointmentRepository.findByUserUserId(userId)
                .stream().map(AppointmentDto::fromSitterAppointment).toList();

        List<AppointmentDto> groomerAppointments = groomerAppointmentRepository.findByUserUserId(userId)
                .stream().map(AppointmentDto::fromGroomerAppointment).toList();

        veterinaryAppointments.addAll(sitterAppointments);
        veterinaryAppointments.addAll(groomerAppointments);

        return veterinaryAppointments;

    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findByRoleRoleId(1L);
    }

    @Override
    public User updateUser(Long userId, CreateUserRequest updateUserRequest) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        user.setFirstName(updateUserRequest.getFirstName());
        user.setLastName(updateUserRequest.getLastName());
        user.setPhoneNo(updateUserRequest.getPhoneNo());
        user.setPassword(updateUserRequest.getPassword());
        user.setEmail(updateUserRequest.getEmail());
        user.setAadharNo(updateUserRequest.getAadharNo());
        user.setAddress(updateUserRequest.getAddress());

        City city = cityRepository.findById(updateUserRequest.getCityId())
                .orElseThrow(
                        () -> new EntityNotFoundException("City not found with id: " + updateUserRequest.getCityId()));
        user.setCity(city);

        Area area = areaRepository.findById(updateUserRequest.getAreaId())
                .orElseThrow(
                        () -> new EntityNotFoundException("Area not found with id: " + updateUserRequest.getAreaId()));
        user.setArea(area);

        Role role = roleRepository.findById(updateUserRequest.getRoleId())
                .orElseThrow(
                        () -> new EntityNotFoundException("Role not found with id: " + updateUserRequest.getRoleId()));
        user.setRole(role);

        return userRepository.save(user);
    }
}
