package com.dox_google_doc_clone.dox_google_doc_clone.User;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
//
//    public Customer findByFirstName(String firstName);
//    public List<Customer> findByLastName(String lastName);

}