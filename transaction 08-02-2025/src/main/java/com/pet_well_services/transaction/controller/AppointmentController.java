package com.pet_well_services.transaction.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pet_well_services.transaction.dto.AppointmentsDto;
import com.pet_well_services.transaction.entities.GroomerAppointment;
import com.pet_well_services.transaction.entities.SitterAppointment;
import com.pet_well_services.transaction.entities.VeterinaryAppointment;
import com.pet_well_services.transaction.response.ApiResponse;
import com.pet_well_services.transaction.service.appointment.IGroomerAppointmentService;
import com.pet_well_services.transaction.service.appointment.ISitterAppointmentService;
import com.pet_well_services.transaction.service.appointment.IVeterinaryAppointmentService;

import com.pet_well_services.transaction.util.Constants;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/appointments")
public class AppointmentController {
    private final IVeterinaryAppointmentService veterinaryAppointmentService;

    private final ISitterAppointmentService sitterAppointmentService;

    private final IGroomerAppointmentService groomerAppointmentService;


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

}
