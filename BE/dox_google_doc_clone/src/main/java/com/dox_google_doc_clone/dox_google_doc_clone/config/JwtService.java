package com.dox_google_doc_clone.dox_google_doc_clone.config;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.Collections;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final String SECRET_KEY = "5C995ED5405DF1C8284F1F7A72C7D0FEDF93D6F822BF3FF7DB7364AD67F368130B0CD81D33BD8B761A6FA726D41CDC001CADF69AF05DFDA129250C41E336CCC7FF307F6CB84CCD9AA8CD7458F06B7A8F5D5D4E3BC53C83C71F9166733FC01C0B4A9204DE2B5FB03F276C45F969889BA6229D83CBB40D28EE170A427745302F88";
    private Set<String> validatedTokens = Collections.synchronizedSet(new HashSet<>());

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
   
    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails) {

        String Token = Jwts.builder().setClaims(extraClaims).setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24 * 30 ))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256).compact();

        validatedTokens.add(Token);
        return Token;
    }

    public Boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractEmail(token);

        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token)
                && validatedTokens.contains(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public Boolean expiredToken(String token) {
        return validatedTokens.remove(token);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
