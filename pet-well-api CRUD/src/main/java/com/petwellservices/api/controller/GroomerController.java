package com.petwellservices.api.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.petwellservices.api.dto.GroomerDto;
import com.petwellservices.api.dto.SitterAppointmentDto;
import com.petwellservices.api.entities.Groomer;
import com.petwellservices.api.entities.GroomerAppointment;

import com.petwellservices.api.request.CreateGroomerRequest;
import com.petwellservices.api.response.ApiResponse;
import com.petwellservices.api.service.IGroomerAppointmentService;
import com.petwellservices.api.service.IGroomerService;
import com.petwellservices.api.util.Constants;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/groomer")
public class GroomerController {
    private final IGroomerService groomerService;

    private final IGroomerAppointmentService groomerAppointmentService;


    @GetMapping
    public ResponseEntity<ApiResponse> getAllGroomers() {

        try {

            List<Groomer> sitters = groomerService.getAllGroomers();
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, sitters));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }


    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse> getGroomerInfoWithSlots(@PathVariable Long userId) {
        try {
            GroomerDto sitter = groomerService.getGroomerInfoWithSlots(userId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, sitter));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));

        }
    }

    @GetMapping("/groomerId/{groomerId}")
    public ResponseEntity<ApiResponse> getGroomerInfoWithSlotsGroomerId(@PathVariable Long groomerId) {
        try {
            GroomerDto sitter = groomerService.getGroomerInfoWithSlotsGroomerId(groomerId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, sitter));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));

        }
    }

    @PutMapping("/{groomerId}")
    public ResponseEntity<ApiResponse> updateGroomer(
            @PathVariable Long groomerId,
            @RequestBody @Valid CreateGroomerRequest updateGroomerRequest) {
        try {
            Groomer updatedGroomer = groomerService.updateGroomer(groomerId, updateGroomerRequest);

            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, updatedGroomer));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));

        }
    }
}
