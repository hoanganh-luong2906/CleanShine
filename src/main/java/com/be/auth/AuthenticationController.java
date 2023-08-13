package com.be.auth;

import com.be.config.LogoutService;
import com.be.dto.request.CustomerRegisterRequest;
import com.be.dto.response.LoginResponse;
import com.be.user.UserEntity;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor

public class AuthenticationController {
    private final AuthenticationService service;
    private final LogoutService logoutService;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody CustomerRegisterRequest request) {
        AuthenticationResponse authenticationResponse = service.register(request);
        if(authenticationResponse == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(authenticationResponse);
    }


    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) {
        LoginResponse loginResponse = service.authenticate(request);
        if(loginResponse == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        logoutService.logout(request, response, authentication);
        return ResponseEntity.ok(null);
    }


}
