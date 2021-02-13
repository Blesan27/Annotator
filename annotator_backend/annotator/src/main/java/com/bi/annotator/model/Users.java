package com.bi.annotator.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
public class Users {

    String _id;
    String firstName;
    String lastName;
    String DOB;
    String email;
    String userName;
    String phoneNumber;
    String password;
    String role;
    int noOfImagesAnnotated = 0;
    public Users(String _id,String firstName, String lastName, String DOB, String phoneNumber, String email, String userName, String password, String role) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.DOB = DOB;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.role = role;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDOB() {
        return DOB;
    }

    public void setDOB(String DOB) {
        this.DOB = DOB;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getNoOfImagesAnnotated() {
        return noOfImagesAnnotated;
    }

    public void setNoOfImagesAnnotated(int noOfImagesAnnotated) {
        this.noOfImagesAnnotated = noOfImagesAnnotated;
    }

    @Override
    public String toString() {
        return "Users{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", DOB=" + DOB +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", email='" + email + '\'' +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
