
package com.pet_well_services.crud.service.sitter;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.pet_well_services.crud.dto.SitterDto;
import com.pet_well_services.crud.dto.SlotDto;
import com.pet_well_services.crud.entities.Area;
import com.pet_well_services.crud.entities.City;
import com.pet_well_services.crud.entities.Sitter;
import com.pet_well_services.crud.entities.SitterAppointment;
import com.pet_well_services.crud.entities.Slot;
import com.pet_well_services.crud.entities.User;
import com.pet_well_services.crud.enums.AppointmentStatus;
import com.pet_well_services.crud.enums.UserStatus;
import com.pet_well_services.crud.exception.InvalidResourceException;
import com.pet_well_services.crud.exception.ResourceNotFoundException;
import com.pet_well_services.crud.repository.AreaRepository;
import com.pet_well_services.crud.repository.CityRepository;
import com.pet_well_services.crud.repository.SitterAppointmentRepository;
import com.pet_well_services.crud.repository.SitterRepository;
import com.pet_well_services.crud.repository.SlotRepository;
import com.pet_well_services.crud.repository.UserRepository;
import com.pet_well_services.crud.request.CreateSitterRequest;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SitterService implements ISitterService {

    private final SitterRepository sitterRepository;

    private final SlotRepository slotRepository;
    private final UserRepository userRepository;

    private final SitterAppointmentRepository appointmentRepository;
    private final ModelMapper modelMapper;
    private final CityRepository cityRepository;
    private final AreaRepository areaRepository;

    @Override
    public List<SitterAppointment> getAllAppointmentsBySitter(Long sitterId) {
        return appointmentRepository.findBySitterSitterId(sitterId);
    }

    @Override
    public List<Sitter> getAllSitters() {
        return sitterRepository.findAllByStatus(UserStatus.APPROVED);
    }

    @Override
    public List<Sitter> getSittersByCityId(Long cityId) {
        return sitterRepository.findByCityCityIdAndStatus(cityId, UserStatus.APPROVED);
    }

    @Override
    public List<Sitter> getSittersByAreaId(Long areaId) {
        return sitterRepository.findByAreaAreaIdAndStatus(areaId, UserStatus.APPROVED);
    }

    @Override
    public SitterDto getSitterInfoWithSlots(Long userId) {
        Sitter sitter = sitterRepository.findByUserUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Sitter ID"));

        SitterDto sitterDto = modelMapper.map(sitter, SitterDto.class);

        List<Slot> slots = slotRepository.findByUserUserId(sitter.getUser().getUserId());

        List<SlotDto> slotDtos = slots.stream().map(slot -> {
            LocalDate today = LocalDate.now();
            boolean isBooked = appointmentRepository.existsBySitterSitterIdAndDateAndSlotSlotId(sitter.getSitterId(),
                    today, slot.getSlotId());
            SlotDto slotDto = new SlotDto();
            slotDto.setSlotId(slot.getSlotId());
            slotDto.setSlotTime(slot.getSlotTime());
            slotDto.setAvailable(!isBooked);
            return slotDto;
        }).toList();

        sitterDto.setSlots(slotDtos);

        return sitterDto;
    }

    @Override
    public SitterDto getSitterInfoWithSlotsBySitterId(Long sitterId) {
        Sitter sitter = sitterRepository.findById(sitterId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Sitter ID"));

        SitterDto sitterDto = modelMapper.map(sitter, SitterDto.class);

        List<Slot> slots = slotRepository.findByUserUserId(sitter.getUser().getUserId());

        List<SlotDto> slotDtos = slots.stream().map(slot -> {
            LocalDate today = LocalDate.now();
            boolean isBooked = appointmentRepository.existsBySitterSitterIdAndDateAndSlotSlotId(sitter.getSitterId(),
                    today, slot.getSlotId());
            SlotDto slotDto = new SlotDto();
            slotDto.setSlotId(slot.getSlotId());
            slotDto.setSlotTime(slot.getSlotTime());
            slotDto.setAvailable(!isBooked);
            return slotDto;
        }).toList();

        sitterDto.setSlots(slotDtos);

        return sitterDto;
    }

    @Override
    public void updateRequestStatus(Long sitterId, UserStatus status) {
        Optional<Sitter> optionalSitter = sitterRepository.findById(sitterId);
        if (optionalSitter.isPresent()) {
            Sitter sitter = optionalSitter.get();
            sitter.setStatus(status);
            sitterRepository.save(sitter);
        } else {
            throw new ResourceNotFoundException("Sitter not found with id: " + sitterId);
        }
    }

    @Transactional
    @Override
    public void deleteSitter(Long sitterId) {
        Sitter sitter = sitterRepository.findById(sitterId).orElseThrow(() -> new RuntimeException("sitter not found"));

        appointmentRepository.deleteBySitterSitterId(sitterId);
        sitterRepository.deleteById(sitterId);
        userRepository.deleteById(sitter.getUser().getUserId());

    }

    @Override
    public Slot createSlot(Slot slot) {
        return slotRepository.save(slot);
    }

    @Override
    public List<Slot> getSlotsBySitter(Long sitterId) {
        return slotRepository.findByUserUserId(sitterId);
    }

    @Override
    public SitterAppointment createAppointment(SitterAppointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public void updateAppointmentStatus(Long appointmentId, AppointmentStatus status) {
        Optional<SitterAppointment> optionalAppointment = appointmentRepository.findById(appointmentId);
        if (optionalAppointment.isPresent()) {
            SitterAppointment appointment = optionalAppointment.get();
            appointment.setStatus(status);
            appointmentRepository.save(appointment);
        } else {
            throw new ResourceNotFoundException("Appointment not found with id: " + appointmentId);
        }
    }

    @Override
    public SitterAppointment bookAppointment(SitterAppointment appointment, User user) {

        if (user == null) {
            throw new InvalidResourceException("User must be logged in to book an appointment.");
        }

        appointment.setUser(user);

        if (!sitterRepository.existsById(appointment.getSitter().getSitterId())) {
            throw new InvalidResourceException("Sitter does not exist.");
        }

        Slot slot = appointment.getSlot();
        if (slot == null || slotRepository.findById(slot.getSlotId()).isEmpty()) {
            throw new InvalidResourceException("Selected slot is not available.");
        }

        return appointmentRepository.save(appointment);
    }

    @Override
    public List<SitterDto> getSitterByStatus(UserStatus status) {
        List<Sitter> sitters = sitterRepository.findByStatus(status);
        return sitters.stream()
                .map(veterinary -> modelMapper.map(veterinary, SitterDto.class))
                .toList();
    }

    @Override
    public Sitter updateSitter(Long sitterId, CreateSitterRequest updateSitterRequest) {

        Sitter sitter = sitterRepository.findById(sitterId)
                .orElseThrow(() -> new EntityNotFoundException("Sitter not found with id: " + sitterId));

        sitter.setCenterPhoneNo(updateSitterRequest.getCenterPhoneNo());
        sitter.setCenterAddress(updateSitterRequest.getCenterAddress());
        sitter.setNoOfSlots(updateSitterRequest.getNoOfSlots());

        City city = cityRepository.findById(updateSitterRequest.getCityId())
                .orElseThrow(() -> new EntityNotFoundException("City not found with id: " + updateSitterRequest.getCityId()));
        sitter.setCity(city);

        Area area = areaRepository.findById(updateSitterRequest.getAreaId())
                .orElseThrow(() -> new EntityNotFoundException("Area not found with id: " + updateSitterRequest.getAreaId()));
        sitter.setArea(area);

        return sitterRepository.save(sitter);
    }

}
