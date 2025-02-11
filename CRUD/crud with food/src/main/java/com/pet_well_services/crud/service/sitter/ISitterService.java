
package com.pet_well_services.crud.service.sitter;

import java.util.List;

import com.pet_well_services.crud.dto.SitterDto;
import com.pet_well_services.crud.entities.Sitter;
import com.pet_well_services.crud.entities.SitterAppointment;
import com.pet_well_services.crud.entities.Slot;
import com.pet_well_services.crud.entities.User;
import com.pet_well_services.crud.enums.AppointmentStatus;
import com.pet_well_services.crud.enums.UserStatus;
import com.pet_well_services.crud.request.CreateSitterRequest;

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
