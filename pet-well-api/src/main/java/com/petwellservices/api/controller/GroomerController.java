package com.petwellservices.api.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.petwellservices.api.dto.GroomerDto;
import com.petwellservices.api.dto.SitterAppointmentDto;
import com.petwellservices.api.entities.Groomer;
import com.petwellservices.api.entities.GroomerAppointment;

import com.petwellservices.api.entities.Slot;
import com.petwellservices.api.entities.User;
import com.petwellservices.api.request.CreateSlotRequest;
import com.petwellservices.api.response.ApiResponse;
import com.petwellservices.api.service.appointment.IGroomerAppointmentService;
import com.petwellservices.api.service.groomer.IGroomerService;
import com.petwellservices.api.service.slot.ISlotService;
import com.petwellservices.api.service.user.IUserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/groomer")
public class GroomerController {
    private final IGroomerService groomerService;
    private final IUserService userService;

    private final IGroomerAppointmentService groomerAppointmentService;

    private final ISlotService slotService;

    @GetMapping("/{userId}/appointments")
    public ResponseEntity<ApiResponse> getAllGroomerAppointments(@PathVariable Long userId) {

        try {

            List<SitterAppointmentDto> appointments = groomerAppointmentService.getGroomerAppointments(userId);
            return ResponseEntity.ok(new ApiResponse("success", appointments));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    /**
     * Get pet information along with user details by appointment ID.
     */
    @GetMapping("/appointments/{appointmentId}/info")
    public ResponseEntity<ApiResponse> getPetInfoWithUserDetails(@PathVariable Long appointmentId) {
        try {

            GroomerAppointment appointmentInfo = groomerAppointmentService.getAppointmentDetails(appointmentId);
            return ResponseEntity.ok(new ApiResponse("success", appointmentInfo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    /**
     * Update appointment status.
     */
    @PutMapping("/appointments/{appointmentId}/status")
    public ResponseEntity<ApiResponse> updateAppointmentStatus(@PathVariable Long appointmentId,
            @RequestParam String status) {
        try {
            groomerService.updateAppointmentStatus(appointmentId, status);
            return ResponseEntity.ok(new ApiResponse("success", "Updated"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    /**
     * Create new slots for a sitter.
     */
    @PostMapping("/{userId}/slots")
    public ResponseEntity<ApiResponse> createSlots(@PathVariable Long userId,
            @Valid @RequestBody CreateSlotRequest request) {
        try {

            User user = userService.getUserById(userId);
            Slot newSlot = new Slot();
            newSlot.setSlotTime(request.getSlotTime());
            newSlot.setUserType(request.getUserType());
            newSlot.setUser(user);
            slotService.createSlot(userId, newSlot);
            return ResponseEntity.ok(new ApiResponse("Slots created successfully", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }

    }

    /**
     * Get list of all sitters.
     */
    @GetMapping
    public ResponseEntity<ApiResponse> getAllGroomers() {

        try {

            List<Groomer> sitters = groomerService.getAllGroomers();
            return ResponseEntity.ok(new ApiResponse("List of all sitters", sitters));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    /**
     * Get sitter information along with slots.
     */
    @GetMapping("/{groomerId}")
    public ResponseEntity<ApiResponse> getGroomerInfoWithSlots(@PathVariable Long groomerId) {
        try {
            GroomerDto sitter = groomerService.getGroomerInfoWithSlots(groomerId);
            return ResponseEntity.ok(new ApiResponse("Sitter info with slots", sitter));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));

        }
    }
}
