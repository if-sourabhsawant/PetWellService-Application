package com.petwellservices.api.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.petwellservices.api.dto.AppointmentsDto;
import com.petwellservices.api.entities.GroomerAppointment;
import com.petwellservices.api.entities.SitterAppointment;
import com.petwellservices.api.entities.VeterinaryAppointment;
import com.petwellservices.api.service.appointment.IGroomerAppointmentService;
import com.petwellservices.api.service.appointment.ISitterAppointmentService;
import com.petwellservices.api.service.appointment.IVeterinaryAppointmentService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/users")
public class UserController {

    private final IVeterinaryAppointmentService veterinaryAppointmentService;

    private final ISitterAppointmentService sitterAppointmentService;

    private final IGroomerAppointmentService groomerAppointmentService;

    @PostMapping("/{userId}/appointments/veterinary")
    public ResponseEntity<VeterinaryAppointment> bookVeterinaryAppointment(
            @PathVariable Long userId,
            @RequestParam Long veterinaryId,
            @RequestParam Long slotId,
            @RequestParam LocalDate date,
            @RequestParam(required = false) String note) {

        VeterinaryAppointment appointment = veterinaryAppointmentService.bookAppointment(userId, veterinaryId, slotId, date, note);
        return ResponseEntity.ok(appointment);
    }

    @PostMapping("/{userId}/appointments/sitter")
    public ResponseEntity<SitterAppointment> bookSitterAppointment(
            @PathVariable Long userId,
            @RequestParam Long sitterId,
            @RequestParam Long slotId,
            @RequestParam LocalDate date,
            @RequestParam(required = false) String note) {

        SitterAppointment appointment = sitterAppointmentService.bookAppointment(userId, sitterId, slotId, date, note);
        return ResponseEntity.ok(appointment);
    }

    @PostMapping("/{userId}/appointments/groomer")
    public ResponseEntity<GroomerAppointment> bookGroomerAppointment(
            @PathVariable Long userId,
            @RequestParam Long groomerId,
            @RequestParam Long slotId,
            @RequestParam LocalDate date,
            @RequestParam(required = false) String note) {

        GroomerAppointment appointment = groomerAppointmentService.bookAppointment(userId, groomerId, slotId, date, note);
        return ResponseEntity.ok(appointment);
    }

    @GetMapping("/{userId}/appointments")
    public ResponseEntity<List<AppointmentsDto>> getUserAppointments(@PathVariable Long userId) {
        List<AppointmentsDto> appointments = veterinaryAppointmentService.getUserAppointments(userId);
        appointments.addAll(sitterAppointmentService.getUserAppointments(userId));
        appointments.addAll(groomerAppointmentService.getUserAppointments(userId));
        return ResponseEntity.ok(appointments);
    }
}
