package com.pet_well_services.crud.controller;

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

import com.pet_well_services.crud.dto.GroomerDto;
import com.pet_well_services.crud.dto.SitterAppointmentDto;
import com.pet_well_services.crud.entities.Groomer;
import com.pet_well_services.crud.entities.GroomerAppointment;

import com.pet_well_services.crud.request.CreateGroomerRequest;
import com.pet_well_services.crud.response.ApiResponse;
import com.pet_well_services.crud.service.appointment.IGroomerAppointmentService;
import com.pet_well_services.crud.service.groomer.IGroomerService;
import com.pet_well_services.crud.util.Constants;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/groomer")
public class GroomerController {
    private final IGroomerService groomerService;

    private final IGroomerAppointmentService groomerAppointmentService;

    @GetMapping("/{userId}/appointments")
    public ResponseEntity<ApiResponse> getAllGroomerAppointments(@PathVariable Long userId) {

        try {

            List<SitterAppointmentDto> appointments = groomerAppointmentService.getGroomerAppointments(userId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, appointments));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/appointments/{appointmentId}/info")
    public ResponseEntity<ApiResponse> getPetInfoWithUserDetails(@PathVariable Long appointmentId) {
        try {

            GroomerAppointment appointmentInfo = groomerAppointmentService.getAppointmentDetails(appointmentId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, appointmentInfo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

 
    @PutMapping("/appointments/{appointmentId}/status")
    public ResponseEntity<ApiResponse> updateAppointmentStatus(@PathVariable Long appointmentId,
            @RequestParam String status) {
        try {
            groomerService.updateAppointmentStatus(appointmentId, status);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, Constants.UPDATE_APPOINTMENT_SUCCESS));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

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
