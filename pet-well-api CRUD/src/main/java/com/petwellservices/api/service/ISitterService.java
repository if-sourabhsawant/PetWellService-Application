
package com.petwellservices.api.service;

import java.util.List;

import com.petwellservices.api.dto.SitterDto;
import com.petwellservices.api.entities.Sitter;
import com.petwellservices.api.entities.SitterAppointment;
import com.petwellservices.api.entities.Slot;
import com.petwellservices.api.entities.User;
import com.petwellservices.api.enums.AppointmentStatus;
import com.petwellservices.api.enums.UserStatus;
import com.petwellservices.api.request.CreateSitterRequest;

public interface ISitterService {
    List<SitterAppointment> getAllAppointmentsBySitter(Long sitterId);

    List<Sitter> getAllSitters();

    List<Sitter> getSittersByCityId(Long cityId);

    List<Sitter> getSittersByAreaId(Long areaId);

    SitterDto getSitterInfoWithSlots(Long userId);
    SitterDto getSitterInfoWithSlotsBySitterId(Long sitterId);

    void updateRequestStatus(Long sitterId, UserStatus status);

    void deleteSitter(Long sitterId);

    Slot createSlot(Slot slot);

    List<Slot> getSlotsBySitter(Long sitterId);

    SitterAppointment createAppointment(SitterAppointment appointment);

    void updateAppointmentStatus(Long appointmentId, AppointmentStatus status);

    SitterAppointment bookAppointment(SitterAppointment appointment, User user);

    List<SitterDto> getSitterByStatus(UserStatus status);

    Sitter updateSitter(Long sitterId, CreateSitterRequest updateSitterRequest);
}
