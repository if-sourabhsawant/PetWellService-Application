package com.petwellservices.api.controller;

import java.time.LocalDate;
import java.util.ArrayList;
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

import com.petwellservices.api.dto.AppointmentsDto;
import com.petwellservices.api.entities.GroomerAppointment;
import com.petwellservices.api.entities.SitterAppointment;
import com.petwellservices.api.entities.Slot;
import com.petwellservices.api.entities.User;
import com.petwellservices.api.entities.VeterinaryAppointment;
import com.petwellservices.api.request.CreateSlotRequest;
import com.petwellservices.api.request.CreateUserRequest;
import com.petwellservices.api.response.ApiResponse;
import com.petwellservices.api.service.IGroomerAppointmentService;
import com.petwellservices.api.service.ISitterAppointmentService;
import com.petwellservices.api.service.ISlotService;
import com.petwellservices.api.service.IUserService;
import com.petwellservices.api.service.IVeterinaryAppointmentService;
import com.petwellservices.api.util.Constants;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {
    private final ISlotService slotService;
    private final IVeterinaryAppointmentService veterinaryAppointmentService;

    private final ISitterAppointmentService sitterAppointmentService;

    private final IGroomerAppointmentService groomerAppointmentService;
    final IUserService userService;

    @PostMapping("/{userId}/appointments/veterinary")
    public ResponseEntity<ApiResponse> bookVeterinaryAppointment(
            @PathVariable Long userId,
            @RequestParam Long veterinaryId,
            @RequestParam Long slotId,
            @RequestParam LocalDate date,
            @RequestParam(required = false) String note) {

        try {

            VeterinaryAppointment appointment = veterinaryAppointmentService.bookAppointment(userId, veterinaryId,
                    slotId, date, note);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, appointment));

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @PostMapping("/{userId}/appointments/sitter")
    public ResponseEntity<ApiResponse> bookSitterAppointment(
            @PathVariable Long userId,
            @RequestParam Long sitterId,
            @RequestParam Long slotId,
            @RequestParam LocalDate date,
            @RequestParam(required = false) String note) {

        try {
            SitterAppointment appointment = sitterAppointmentService.bookAppointment(userId, sitterId, slotId, date,
                    note);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, appointment));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse> getUserById(
            @PathVariable Long userId) {

        try {
            User user = userService.getUserById(userId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, user));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @PostMapping("/{userId}/appointments/groomer")
    public ResponseEntity<ApiResponse> bookGroomerAppointment(@PathVariable Long userId, @RequestParam Long groomerId,
            @RequestParam Long slotId, @RequestParam LocalDate date,
            @RequestParam(required = false) String note) {

        try {
            GroomerAppointment appointment = groomerAppointmentService.bookAppointment(userId, groomerId, slotId, date,
                    note);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, appointment));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }

    }

    @GetMapping("/{userId}/appointments")
    public ResponseEntity<ApiResponse> getUserAppointments(@PathVariable Long userId) {

        List<AppointmentsDto> appointments = new ArrayList<>();
        appointments.addAll(veterinaryAppointmentService.getUserAppointments(userId));

        appointments.addAll(sitterAppointmentService.getUserAppointments(userId));
        appointments.addAll(groomerAppointmentService.getUserAppointments(userId));
        return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, appointments));

    }

    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse> updateUser(@PathVariable Long userId,
            @RequestBody @Valid CreateUserRequest updateUserRequest) {

        try {
            User updatedUser = userService.updateUser(userId, updateUserRequest);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, updatedUser));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @PutMapping("/{slotId}/slots")
    public ResponseEntity<ApiResponse> updateSlot(@PathVariable Long slotId,
            @Valid @RequestBody CreateSlotRequest request) {
        try {
            Slot newSlot = new Slot();
            newSlot.setSlotTime(request.getSlotTime());
            newSlot.setUserType(request.getUserType());
            slotService.updateSlot(slotId, newSlot);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, "Slots Update successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

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
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, Constants.SLOTS_CREATED));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }
}
