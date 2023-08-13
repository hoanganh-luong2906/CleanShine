package com.be.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.be.user.Permission.ADMIN_READ;
import static com.be.user.Permission.ADMIN_UPDATE;
import static com.be.user.Permission.ADMIN_DELETE;
import static com.be.user.Permission.ADMIN_CREATE;
import static com.be.user.Permission.CUSTOMER_CREATE;
import static com.be.user.Permission.CUSTOMER_DELETE;
import static com.be.user.Permission.CUSTOMER_UPDATE;
import static com.be.user.Permission.CUSTOMER_READ;
import static com.be.user.Permission.EMPLOYEE_READ;

@RequiredArgsConstructor
public enum Role {
    EMPLOYEE(Set.of(
            EMPLOYEE_READ
    )),
    CUSTOMER(Set.of(
            CUSTOMER_CREATE,
            CUSTOMER_DELETE,
            CUSTOMER_READ,
            CUSTOMER_UPDATE
    )),
    ADMIN(Set.of(
            ADMIN_READ,
            ADMIN_UPDATE,
            ADMIN_DELETE,
            ADMIN_CREATE
    ));
    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
