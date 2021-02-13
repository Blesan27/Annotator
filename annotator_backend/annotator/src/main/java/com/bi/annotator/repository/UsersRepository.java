package com.bi.annotator.repository;


import com.bi.annotator.model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface UsersRepository extends MongoRepository<Users,String> {

    Users findByUserName(String UserName);
    Users findByFirstName(String firstName);
}
