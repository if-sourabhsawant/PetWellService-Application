package com.pet_well_services.crud.controller;

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

import com.pet_well_services.crud.dto.AppointmentsDto;
import com.pet_well_services.crud.entities.GroomerAppointment;
import com.pet_well_services.crud.entities.SitterAppointment;
import com.pet_well_services.crud.entities.Slot;
import com.pet_well_services.crud.entities.User;
import com.pet_well_services.crud.entities.VeterinaryAppointment;
import com.pet_well_services.crud.request.CreateSlotRequest;
import com.pet_well_services.crud.request.CreateUserRequest;
import com.pet_well_services.crud.response.ApiResponse;
import com.pet_well_services.crud.service.appointment.IGroomerAppointmentService;
import com.pet_well_services.crud.service.appointment.ISitterAppointmentService;
import com.pet_well_services.crud.service.appointment.IVeterinaryAppointmentService;
import com.pet_well_services.crud.service.slot.ISlotService;
import com.pet_well_services.crud.service.user.IUserService;
import com.pet_well_services.crud.util.Constants;

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

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> registerUser(@RequestBody CreateUserRequest request) {
        try {
            User user = userService.createUser(request);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }
}
