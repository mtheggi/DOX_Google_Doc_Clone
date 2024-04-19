package com.dox_google_doc_clone.dox_google_doc_clone.auth;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.User;
import com.dox_google_doc_clone.dox_google_doc_clone.Repositories.UserRepository;
import com.dox_google_doc_clone.dox_google_doc_clone.config.JwtService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
@Service
@RequiredArgsConstructor
public class AuthenticationService {
        private final UserRepository repository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;
        public void createToken(HttpServletResponse response, String token) {
                Cookie cookie = new Cookie("token", token);
                cookie.setHttpOnly(true);
                cookie.setPath("/");
                response.addCookie(cookie);
            }
        public AuthenticationResponse register(RegisterRequest request) {

                var user = new User(request.getUsername(), passwordEncoder.encode(request.getPassword()),
                                request.getEmail());

                repository.save(user);
                var jwtToken = jwtService.generateToken(user);

                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .build();
        }

        public AuthenticationResponse authenticate(AuthenticationRequest request) {

                try {
                        authenticationManager.authenticate(
                                        new UsernamePasswordAuthenticationToken(
                                                        request.getEmail(),
                                                        request.getPassword()));
                } catch (Exception e) {

                        return AuthenticationResponse.builder()
                                        .token(null)
                                        .message("Invalid email/password")
                                        .build();
                }

                var user = repository.findByEmail(request.getEmail())
                                .orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .build();
        }



}