
package com.petwellservices.api.service;

import java.util.List;

import com.petwellservices.api.dto.GroomerDto;
import com.petwellservices.api.entities.Groomer;
import com.petwellservices.api.entities.GroomerAppointment;
import com.petwellservices.api.entities.Slot;
import com.petwellservices.api.enums.UserStatus;
import com.petwellservices.api.request.CreateGroomerRequest;

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
