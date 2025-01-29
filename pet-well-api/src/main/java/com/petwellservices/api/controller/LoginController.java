package com.petwellservices.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petwellservices.api.entities.User;
import com.petwellservices.api.request.CreateUserRequest;
import com.petwellservices.api.request.LoginRequest;
import com.petwellservices.api.response.ApiResponse;
import com.petwellservices.api.service.user.IUserService;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/auth")
public class LoginController {

    private final IUserService userService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> loginUser(@RequestBody LoginRequest request) {

        try {
            Optional<User> userOptional = userService.checkUserCredential(request.getEmail(),
                    request.getPassword());

            if (userOptional.isPresent()) {
                User user = userOptional.get();

                return ResponseEntity.ok(new ApiResponse("success", user));
            }

            // Return error response if credentials are invalid
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse("error", "Invalid email or password"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("error", "Invalid email or password"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> registerUser(@RequestBody CreateUserRequest request) {
        try {
            User user = userService.createUser(request);
            return ResponseEntity.ok(new ApiResponse("success", user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponse> test() {
        return ResponseEntity.ok(new ApiResponse("success", "Api Working"));
    }

}
