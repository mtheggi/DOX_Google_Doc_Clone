package com.dox_google_doc_clone.dox_google_doc_clone.Services;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.User;
import com.dox_google_doc_clone.dox_google_doc_clone.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    public User saveUser(User user) {

        return userRepository.save(user);
    }
    public User getUserByName(String UserName) {
        return userRepository.findByUserName(UserName);
    }

    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

}
