package com.pet_well_services.crud.data;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.pet_well_services.crud.entities.Area;
import com.pet_well_services.crud.entities.Category;
import com.pet_well_services.crud.entities.City;
import com.pet_well_services.crud.entities.Role;
import com.pet_well_services.crud.entities.User;
import com.pet_well_services.crud.repository.AreaRepository;
import com.pet_well_services.crud.repository.CategoryRepository;
import com.pet_well_services.crud.repository.CityRepository;
import com.pet_well_services.crud.repository.RoleRepository;
import com.pet_well_services.crud.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationListener<ApplicationReadyEvent> {

    final RoleRepository roleRepository;

    final CityRepository cityRepository;

    final AreaRepository areaRepository;
    final CategoryRepository categoryRepository;
    final UserRepository userRepository;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        createRoleIfNotExists();
        createDummyCitiesAndAreas();
        createDummyCatAndBreed();
        createAdmin();
    }

    private void createAdmin() {
        System.out.println("sdf");
        if (!userRepository.existsByEmail("admin@gmail.com")) {
            User adminUser = new User();
            adminUser.setFirstName("admin");
            adminUser.setLastName("admin");
            adminUser.setPhoneNo("admin");
            adminUser.setPassword("admin");
            adminUser.setEmail("admin@gmail.com");
            adminUser.setAadharNo("admin");
            adminUser.setAddress("admin");
            adminUser.setCity(cityRepository.findById(1L).get());
            adminUser.setArea(areaRepository.findById(1L).get());
            adminUser.setRole(roleRepository.findById(5L).get());

            userRepository.save(adminUser);
            System.out.println("adminCreated");
        }

    }

    private void createRoleIfNotExists() {
        String[] roles = { "USER", "VETERINARY", "SITTER", "GROOMER", "ADMIN","FOODSHOP"};

        for (String roleName : roles) {
            String role = "ROLE_" + roleName;

            if (roleRepository.existsByRoleName(role)) {
                continue;
            }

            Role roleEntity = new Role();
            roleEntity.setRoleName(role);
            roleRepository.save(roleEntity);
            System.out.println("Role created: " + role);
        }
    }

    void createDummyCitiesAndAreas() {
        String[] citiesInMaharashtra = {
                "Mumbai", "Pune", "Nashik",
                "Solapur", "Thane", "Kolhapur"
        };

        for (String cityName : citiesInMaharashtra) {

            if (!cityRepository.existsByCityName(cityName)) {

                City city = new City();
                city.setCityName(cityName);
                cityRepository.save(city);
                System.out.println("City created: " + cityName);

                String[] areas = { "Area 1", "Phase 36", "Area 52" };
                for (String areaName : areas) {
                    Area area = new Area();
                    area.setAreaName(cityName + " " + areaName);
                    area.setCity(city); 
                    areaRepository.save(area);
                    System.out.println("Area created: " + areaName + " in " + cityName);
                }
            }
        }
    }

    void createDummyCatAndBreed() {
        String[] categories = {
                "Cat", "Bog",
        };

        String[] breeds = {
                "Cat breed", "Bog breed",
        };

        for (String name : categories) {

            if (!categoryRepository.existsByCategoryName(name)) {

                Category city = new Category();
                city.setCategoryName(name);
                categoryRepository.save(city);
                System.out.println("cat created: " + name);

            }
        }

        
    }

}
