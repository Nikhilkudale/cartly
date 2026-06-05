package com.ecommerce.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    private final JwtProperties jwtProperties;

    public JwtService(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        var builder = Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtProperties.getExpirationMs()));

        if (userDetails instanceof UserPrincipal principal) {
            builder.claim("userId", principal.getId())
                   .claim("fullName", principal.getFullName())
                   .claim("role", principal.getAuthorities().iterator().next().getAuthority());
        }

        return builder.signWith(getSigningKey()).compact();
    }

    public UserPrincipal extractUserPrincipal(String token) {
        Claims claims = extractAllClaims(token);
        String email = claims.getSubject();
        Number userIdNum = claims.get("userId", Number.class);
        if (userIdNum == null) {
            throw new io.jsonwebtoken.MalformedJwtException("Missing userId claim in token");
        }
        Long userId = userIdNum.longValue();
        String fullName = claims.get("fullName", String.class);
        String role = claims.get("role", String.class);
        if (role == null) {
            throw new io.jsonwebtoken.MalformedJwtException("Missing role claim in token");
        }
        return new UserPrincipal(userId, email, fullName, role);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
