
package com.petwellservices.api.service;

import java.util.List;

import com.petwellservices.api.entities.Role;

public interface IRoleService {

    Role getRoleById(Long roleId);

    List<Role> getRoles();

    Role createRole(String roleName);

    void deleteRole(Long roleId);
}
