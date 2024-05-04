package com.dox_google_doc_clone.dox_google_doc_clone.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.dox_google_doc_clone.dox_google_doc_clone.Repositories.UserRepository;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthenticationController {

    private final AuthenticationService service;
    private final UserRepository repository;

    
    @PostMapping("/user/signup")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        System.out.println(request);
        if(repository.findByUserName(request.getUsername()) != null){
            return ResponseEntity.badRequest().body(new AuthenticationResponse("Username already exists"));
        }
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(new AuthenticationResponse("Email already exists"));
        }
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/user/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) {
        AuthenticationResponse response = service.authenticate(request);
        if (response.getToken() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        return ResponseEntity.ok(response);
    }

}