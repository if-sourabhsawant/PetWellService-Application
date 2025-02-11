
package com.pet_well_services.crud.service.veterinary;

import java.util.List;

import com.pet_well_services.crud.dto.VeterinaryDto;
import com.pet_well_services.crud.entities.Slot;
import com.pet_well_services.crud.entities.Veterinary;
import com.pet_well_services.crud.entities.VeterinaryAppointment;
import com.pet_well_services.crud.enums.AppointmentStatus;
import com.pet_well_services.crud.enums.UserStatus;
import com.pet_well_services.crud.request.CreateVeterinaryRequest;

public interface IVeterinaryService {
    List<VeterinaryAppointment> getAllAppointments(Long veterinaryId);

    List<Veterinary> getAllVeterinaries();

    List<Veterinary> getVeterinariesByCityId(Long cityId);

    List<Veterinary> getVeterinariesByAreaId(Long areaId);

    VeterinaryDto getVeterinaryInfoWithSlots(Long userId);

    VeterinaryDto getVeterinaryInfoWithSlotsByVeterinaryId(Long veterinaryId);

    void updateRequestStatus(Long veterinaryId, UserStatus status);

    void deleteVeterinary(Long veterinaryId);

    Slot createSlot(Slot slot);

    List<Slot> getSlotsByVeterinary(Long userId);

    VeterinaryAppointment createAppointment(VeterinaryAppointment appointment);

    void updateAppointmentStatus(Long appointmentId, AppointmentStatus status);

    List<VeterinaryDto> getVeterinariesByStatus(UserStatus status);

    Veterinary updateVeterinary(Long veterinaryId, CreateVeterinaryRequest updateVeterinaryRequest);
}
