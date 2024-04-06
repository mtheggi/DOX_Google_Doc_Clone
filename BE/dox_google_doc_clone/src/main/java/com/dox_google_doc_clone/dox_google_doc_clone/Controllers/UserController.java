package com.dox_google_doc_clone.dox_google_doc_clone.Controllers;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.User;
import com.dox_google_doc_clone.dox_google_doc_clone.Services.UserService;
import com.dox_google_doc_clone.dox_google_doc_clone.config.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;

    @GetMapping("/user/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user/logout")
    public ResponseEntity<String> logOutUser(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        System.err.println("here" + request);
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            System.err.println(token);
            jwtService.expiredToken(token);
            return new ResponseEntity<>("User has been logged out", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Authorization header not found", HttpStatus.BAD_REQUEST);
        }
    }

    // @PostMapping("/user/signup")
    // public ResponseEntity<User> saveUser(@RequestBody User user) {
    // if (user.getUserName() == null || user.getEmail() == null ||
    // user.getPassword() == null) {
    // return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    // }
    // User savedUser = userService.saveUser(user);
    // return new ResponseEntity<>(savedUser, HttpStatus.OK);
    // }

}
