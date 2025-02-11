
package com.pet_well_services.crud.service.groomer;

import java.time.LocalDate;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.pet_well_services.crud.dto.GroomerDto;
import com.pet_well_services.crud.dto.SlotDto;
import com.pet_well_services.crud.entities.Area;
import com.pet_well_services.crud.entities.City;
import com.pet_well_services.crud.entities.Groomer;
import com.pet_well_services.crud.entities.GroomerAppointment;
import com.pet_well_services.crud.entities.Slot;
import com.pet_well_services.crud.enums.AppointmentStatus;
import com.pet_well_services.crud.enums.UserStatus;
import com.pet_well_services.crud.exception.ResourceNotFoundException;
import com.pet_well_services.crud.repository.AreaRepository;
import com.pet_well_services.crud.repository.CityRepository;
import com.pet_well_services.crud.repository.GroomerAppointmentRepository;
import com.pet_well_services.crud.repository.GroomerRepository;
import com.pet_well_services.crud.repository.SlotRepository;
import com.pet_well_services.crud.repository.UserRepository;
import com.pet_well_services.crud.request.CreateGroomerRequest;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class GroomerService implements IGroomerService {

    private final GroomerRepository groomerRepository;

    private final SlotRepository slotRepository;
    private final UserRepository userRepository;
    private final CityRepository cityRepository;
    private final AreaRepository areaRepository;

    private final GroomerAppointmentRepository appointmentRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<Groomer> getAllGroomers() {
        return groomerRepository.findAllByStatus(UserStatus.APPROVED);
    }

    @Override
    public List<Groomer> getGroomersByCityId(Long cityId) {
        return groomerRepository.findByCityCityIdAndStatus(cityId, UserStatus.APPROVED);
    }

    @Override
    public List<Groomer> getGroomersByAreaId(Long areaId) {
        return groomerRepository.findByAreaAreaIdAndStatus(areaId, UserStatus.APPROVED);
    }

    @Override
    public GroomerDto getGroomerInfoWithSlots(Long userId) {
        Groomer groomer = groomerRepository.findByUserUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Groomer ID"));

        GroomerDto groomerDto = modelMapper.map(groomer, GroomerDto.class);

        List<Slot> slots = slotRepository.findByUserUserId(groomer.getUser().getUserId());

        List<SlotDto> slotDtos = slots.stream().map(slot -> {
            LocalDate today = LocalDate.now();
            boolean isBooked = appointmentRepository
                    .existsByGroomerGroomerIdAndDateAndSlotSlotId(groomer.getGroomerId(), today, slot.getSlotId());
            SlotDto slotDto = new SlotDto();
            slotDto.setSlotId(slot.getSlotId());
            slotDto.setSlotTime(slot.getSlotTime());
            slotDto.setAvailable(!isBooked);
            return slotDto;
        }).toList();

        groomerDto.setSlots(slotDtos);

        return groomerDto;
    }

    @Override
    public GroomerDto getGroomerInfoWithSlotsGroomerId(Long groomerId) {
        Groomer groomer = groomerRepository.findById(groomerId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Groomer ID"));

        GroomerDto groomerDto = modelMapper.map(groomer, GroomerDto.class);

        List<Slot> slots = slotRepository.findByUserUserId(groomer.getUser().getUserId());

        List<SlotDto> slotDtos = slots.stream().map(slot -> {
            LocalDate today = LocalDate.now();
            boolean isBooked = appointmentRepository
                    .existsByGroomerGroomerIdAndDateAndSlotSlotId(groomer.getGroomerId(), today, slot.getSlotId());
            SlotDto slotDto = new SlotDto();
            slotDto.setSlotId(slot.getSlotId());
            slotDto.setSlotTime(slot.getSlotTime());
            slotDto.setAvailable(!isBooked);
            return slotDto;
        }).toList();

        groomerDto.setSlots(slotDtos);

        return groomerDto;
    }

    @Override
    public GroomerAppointment createAppointment(GroomerAppointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public List<GroomerAppointment> getAppointmentsByGroomerId(Long groomerId) {
        return appointmentRepository.findByGroomerGroomerId(groomerId);
    }

    @Override
    public List<Slot> getSlotsByGroomerId(Long groomerId) {
        return slotRepository.findByUserUserId(groomerRepository.findById(groomerId).get().getGroomerId());
    }

    @Override
    public Groomer createGroomer(Groomer groomer) {
        return groomerRepository.save(groomer);
    }

    @Override
    public Groomer updateGroomerStatus(Long groomerId, String status) {
        Groomer groomer = groomerRepository.findById(groomerId)
                .orElseThrow(() -> new RuntimeException("Groomer not found"));
        groomer.setStatus(UserStatus.valueOf(status));
        return groomerRepository.save(groomer);
    }

    @Transactional
    @Override
    public Groomer deleteGroomer(Long groomerId) {
        Groomer groomer = groomerRepository.findById(groomerId)
                .orElseThrow(() -> new RuntimeException("Groomer not found"));
        appointmentRepository.deleteByGroomerGroomerId(groomerId);
        groomerRepository.delete(groomer);
        userRepository.deleteById(groomer.getUser().getUserId());
        return groomer;
    }

    @Override
    public Slot createSlot(Slot slot) {
        return slotRepository.save(slot);
    }

    @Override
    public List<Slot> getAllSlots() {
        return slotRepository.findAll();
    }

    @Override
    public GroomerAppointment updateAppointmentStatus(Long appointmentId, String status) {
        GroomerAppointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(AppointmentStatus.valueOf(status));
        return appointmentRepository.save(appointment);
    }

    @Override
    public List<GroomerDto> getGroomersByStatus(UserStatus status) {
        List<Groomer> groomer = groomerRepository.findByStatus(status);
        return groomer.stream()
                .map(g -> modelMapper.map(g, GroomerDto.class))
                .toList();
    }

    @Override
    public Groomer updateGroomer(Long groomerId, CreateGroomerRequest updateGroomerRequest) {

        Groomer groomer = groomerRepository.findById(groomerId)
                .orElseThrow(() -> new EntityNotFoundException("Groomer not found with id: " + groomerId));

        groomer.setShopName(updateGroomerRequest.getShopName());
        groomer.setShopPhoneNo(updateGroomerRequest.getShopPhoneNo());
        groomer.setShopAddress(updateGroomerRequest.getShopAddress());
        groomer.setNoOfSlots(updateGroomerRequest.getNoOfSlots());

        City city = cityRepository.findById(updateGroomerRequest.getCityId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "City not found with id: " + updateGroomerRequest.getCityId()));
        groomer.setCity(city);

        Area area = areaRepository.findById(updateGroomerRequest.getAreaId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Area not found with id: " + updateGroomerRequest.getAreaId()));
        groomer.setArea(area);

        return groomerRepository.save(groomer);
    }
}
