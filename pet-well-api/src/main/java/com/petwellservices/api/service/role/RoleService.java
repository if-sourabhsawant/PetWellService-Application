
package com.petwellservices.api.service.role;

import java.util.List;

import org.springframework.stereotype.Service;

import com.petwellservices.api.entities.Role;

@Service
public class RoleService implements IRoleService {

    @Override
    public Role createRole(String roleName) {
        throw new UnsupportedOperationException("Unimplemented method 'createRole'");
    }

    @Override
    public Role getRoleById(Long roleId) {
        throw new UnsupportedOperationException("Unimplemented method 'getRoleById'");
    }

    @Override
    public List<Role> getRoles() {
        throw new UnsupportedOperationException("Unimplemented method 'getRoles'");
    }

    @Override
    public void deleteRole(Long roleId) {
        throw new UnsupportedOperationException("Unimplemented method 'deleteRole'");
    }

    
}
