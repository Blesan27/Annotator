package com.bi.annotator;

import com.bi.annotator.model.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class MyUserDetails implements UserDetails {


    private String userName;
    private String password;
    private List<GrantedAuthority> authorities;
    private String role;

    public MyUserDetails(){
    }

    public MyUserDetails(Users users){
        System.out.println("44444444444444444444444444444444444444444444444444444444444444444444444444444");
        this.userName = users.getUserName();
        this.password = users.getPassword();
        this.authorities = Arrays.stream(users.getRole().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        this.role = users.getRole();
        System.out.println("55555555555555555555555555555555555555555555555555555555555555555555");
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
