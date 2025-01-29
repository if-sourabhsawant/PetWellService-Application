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

import com.petwellservices.api.dto.SitterAppointmentDto;
import com.petwellservices.api.dto.VeterinaryDto;
import com.petwellservices.api.entities.Slot;
import com.petwellservices.api.entities.User;
import com.petwellservices.api.entities.Veterinary;
import com.petwellservices.api.entities.VeterinaryAppointment;
import com.petwellservices.api.entities.VeterinaryAppointment.AppointmentStatus;
import com.petwellservices.api.request.CreateSlotRequest;
import com.petwellservices.api.response.ApiResponse;
import com.petwellservices.api.service.appointment.IVeterinaryAppointmentService;
import com.petwellservices.api.service.slot.ISlotService;
import com.petwellservices.api.service.user.IUserService;
import com.petwellservices.api.service.veterinary.IVeterinaryService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/veterinary")
public class VeterinaryController {
    private final IVeterinaryService veterinaryService;
    private final IUserService userService;

    private final IVeterinaryAppointmentService veterinaryAppointmentService;

    private final ISlotService slotService;

    @GetMapping("/{userId}/appointments")
    public ResponseEntity<ApiResponse> getAllVeterinaryAppointments(@PathVariable Long userId) {

        try {

            List<SitterAppointmentDto> appointments = veterinaryAppointmentService.getVeterinaryAppointments(userId);
            return ResponseEntity.ok(new ApiResponse("List of all veterinary appointments", appointments));
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

            VeterinaryAppointment appointmentInfo = veterinaryAppointmentService.getAppointmentDetails(appointmentId);
            return ResponseEntity.ok(new ApiResponse("Appointment details with pet and user info", appointmentInfo));
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
            @RequestParam AppointmentStatus status) {
        try {
            veterinaryService.updateAppointmentStatus(appointmentId, status);
            return ResponseEntity.ok(new ApiResponse("Appointment status updated successfully", null));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    /**
     * Create new slots for a veterinary.
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
     * Get list of all veterinaries.
     */
    @GetMapping
    public ResponseEntity<ApiResponse> getAllVeterinaries() {

        try {

            List<Veterinary> veterinaries = veterinaryService.getAllVeterinaries();
            return ResponseEntity.ok(new ApiResponse("success", veterinaries));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));
        }
    }

    /**
     * Get veterinary information along with slots.
     */
    @GetMapping("/{veterinaryId}")
    public ResponseEntity<ApiResponse> getVeterinaryInfoWithSlots(@PathVariable Long veterinaryId) {
        try {
            VeterinaryDto veterinary = veterinaryService.getVeterinaryInfoWithSlots(veterinaryId);
            return ResponseEntity.ok(new ApiResponse("Veterinary info with slots", veterinary));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));

        }
    }
}
