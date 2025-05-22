package com.pet_well_services.transaction.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pet_well_services.transaction.entities.Role;

public interface RoleRepository extends JpaRepository<Role,Long> {

    boolean existsByRoleName(String roleName);
    
}
