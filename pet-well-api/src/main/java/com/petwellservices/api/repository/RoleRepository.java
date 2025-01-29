package com.petwellservices.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petwellservices.api.entities.Role;

public interface RoleRepository extends JpaRepository<Role,Long> {

    boolean existsByRoleName(String roleName);
    
}
