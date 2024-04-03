package com.dox_google_doc_clone.dox_google_doc_clone.Repositories;


import com.dox_google_doc_clone.dox_google_doc_clone.Models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    // Custom Queries

    User findByUserName(String UserName);
//
//    @Query("{ 'age' : { $gt: ?0 } }")
//    List<User> findByAgeGreaterThan(int age);
}