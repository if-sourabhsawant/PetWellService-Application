
package com.pet_well_services.crud.service.groomer;

import java.util.List;

import com.pet_well_services.crud.dto.GroomerDto;
import com.pet_well_services.crud.entities.Groomer;
import com.pet_well_services.crud.entities.GroomerAppointment;
import com.pet_well_services.crud.entities.Slot;
import com.pet_well_services.crud.enums.UserStatus;
import com.pet_well_services.crud.request.CreateGroomerRequest;

public interface IGroomerService {
  List<Groomer> getAllGroomers();

  List<Groomer> getGroomersByCityId(Long cityId);

  List<Groomer> getGroomersByAreaId(Long areaId);

  GroomerDto getGroomerInfoWithSlots(Long userId);

  GroomerDto getGroomerInfoWithSlotsGroomerId(Long groomerId);

  GroomerAppointment createAppointment(GroomerAppointment appointment);

  List<GroomerAppointment> getAppointmentsByGroomerId(Long groomerId);

  List<Slot> getSlotsByGroomerId(Long groomerId);

  Groomer createGroomer(Groomer groomer);

  Groomer updateGroomerStatus(Long groomerId, String status);

  Groomer deleteGroomer(Long groomerId);

  Slot createSlot(Slot slot);

  List<Slot> getAllSlots();

  GroomerAppointment updateAppointmentStatus(Long appointmentId, String status);

  List<GroomerDto> getGroomersByStatus(UserStatus status);

  Groomer updateGroomer(Long groomerId, CreateGroomerRequest updateGroomerRequest);
}
