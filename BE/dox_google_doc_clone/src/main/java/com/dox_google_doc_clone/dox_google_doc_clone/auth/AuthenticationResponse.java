package com.dox_google_doc_clone.dox_google_doc_clone.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class AuthenticationResponse {

    @JsonProperty("token")
    private String token;

    @JsonProperty("message")
    private String message;

    public AuthenticationResponse(String message) {
        this.message = message;
    }
}