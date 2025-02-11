
package com.pet_well_services.crud.service.user;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.pet_well_services.crud.dto.AppointmentDto;
import com.pet_well_services.crud.dto.PetDto;
import com.pet_well_services.crud.dto.UserWithPetsDto;
import com.pet_well_services.crud.entities.Area;
import com.pet_well_services.crud.entities.Category;
import com.pet_well_services.crud.entities.City;
import com.pet_well_services.crud.entities.FoodShop;
import com.pet_well_services.crud.entities.Groomer;
import com.pet_well_services.crud.entities.Pet;
import com.pet_well_services.crud.entities.Role;
import com.pet_well_services.crud.entities.Sitter;
import com.pet_well_services.crud.entities.User;
import com.pet_well_services.crud.entities.Veterinary;
import com.pet_well_services.crud.enums.UserStatus;
import com.pet_well_services.crud.exception.ResourceNotFoundException;
import com.pet_well_services.crud.repository.AreaRepository;
import com.pet_well_services.crud.repository.CategoryRepository;
import com.pet_well_services.crud.repository.CityRepository;
import com.pet_well_services.crud.repository.GroomerAppointmentRepository;
import com.pet_well_services.crud.repository.GroomerRepository;
import com.pet_well_services.crud.repository.PetRepository;
import com.pet_well_services.crud.repository.RoleRepository;
import com.pet_well_services.crud.repository.SitterAppointmentRepository;
import com.pet_well_services.crud.repository.SitterRepository;
import com.pet_well_services.crud.repository.UserRepository;
import com.pet_well_services.crud.repository.VeterinaryAppointmentRepository;
import com.pet_well_services.crud.repository.VeterinaryRepository;
import com.pet_well_services.crud.request.CreateGroomerRequest;
import com.pet_well_services.crud.request.CreatePetRequest;
import com.pet_well_services.crud.request.CreateSitterRequest;
import com.pet_well_services.crud.request.CreateUserRequest;
import com.pet_well_services.crud.request.CreateVeterinaryRequest;
import com.pet_well_services.crud.service.foodshop.IFoodShopService;

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
    private final PetRepository petRepository;
    private final IFoodShopService foodShopService;
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
            case 6:
                foodShopService.createFoodShop(request.getFoodShop(),
                        cityRepository.findById(request.getFoodShop().getCityId()).get(),
                        areaRepository.findById(request.getFoodShop().getAreaId()).get());
                return user;
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
