package com.bi.annotator.model;

public class AuthenticateResponse {
    private final String jwt;
    public String role;

    public AuthenticateResponse(String jwt, String role) {
        this.jwt = jwt;
        this.role = role;
    }

    public String getJwt() {
        return jwt;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "AuthenticateResponse{" +
                "jwt='" + jwt + '\'' +
                ", Role='" + role + '\'' +
                '}';
    }
}
