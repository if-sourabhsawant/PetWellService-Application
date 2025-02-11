
package com.pet_well_services.crud.service.role;

import java.util.List;

import com.pet_well_services.crud.entities.Role;

public interface IRoleService {

    Role getRoleById(Long roleId);

    List<Role> getRoles();

    Role createRole(String roleName);

    void deleteRole(Long roleId);
}
