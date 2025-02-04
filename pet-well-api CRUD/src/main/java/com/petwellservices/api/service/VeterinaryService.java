
package com.petwellservices.api.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.petwellservices.api.dto.SlotDto;
import com.petwellservices.api.dto.VeterinaryDto;
import com.petwellservices.api.entities.Area;
import com.petwellservices.api.entities.City;
import com.petwellservices.api.entities.Slot;
import com.petwellservices.api.entities.Veterinary;
import com.petwellservices.api.entities.VeterinaryAppointment;
import com.petwellservices.api.enums.AppointmentStatus;
import com.petwellservices.api.enums.UserStatus;
import com.petwellservices.api.exception.ResourceNotFoundException;
import com.petwellservices.api.repository.AreaRepository;
import com.petwellservices.api.repository.CityRepository;
import com.petwellservices.api.repository.SlotRepository;
import com.petwellservices.api.repository.UserRepository;
import com.petwellservices.api.repository.VeterinaryAppointmentRepository;
import com.petwellservices.api.repository.VeterinaryRepository;
import com.petwellservices.api.request.CreateVeterinaryRequest;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class VeterinaryService implements IVeterinaryService {

    private final VeterinaryRepository veterinaryRepository;

    private final SlotRepository slotRepository;

    private final VeterinaryAppointmentRepository appointmentRepository;

    private final ModelMapper modelMapper;

    private final CityRepository cityRepository;
    private final AreaRepository areaRepository;
    private final UserRepository userRepository;

    @Override
    public List<VeterinaryAppointment> getAllAppointments(Long veterinaryId) {
        return appointmentRepository.findByVeterinaryVeterinaryId(veterinaryId);
    }

    @Override
    public List<Veterinary> getAllVeterinaries() {

        return veterinaryRepository.findAllByStatus(UserStatus.APPROVED);
    }

    @Override
    public List<Veterinary> getVeterinariesByCityId(Long cityId) {
        return veterinaryRepository.findByCityCityIdAndStatus(cityId, UserStatus.APPROVED);
    }

    @Override
    public VeterinaryDto getVeterinaryInfoWithSlots(Long userId) {
        Veterinary veterinary = veterinaryRepository.findByUserUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Veterinary userId ID"));

        VeterinaryDto sitterDto = modelMapper.map(veterinary, VeterinaryDto.class);

        List<Slot> slots = slotRepository.findByUserUserId(veterinary.getUser().getUserId());

        List<SlotDto> slotDtos = slots.stream().map(slot -> {
            LocalDate today = LocalDate.now();

            boolean isBooked = appointmentRepository.existsByVeterinaryVeterinaryIdAndDateAndSlotSlotId(
                    veterinary.getVeterinaryId(), today, slot.getSlotId());
            SlotDto slotDto = new SlotDto();
            slotDto.setSlotId(slot.getSlotId());
            slotDto.setSlotTime(slot.getSlotTime());
            slotDto.setAvailable(!isBooked);
            return slotDto;
        }).collect(Collectors.toList());

        sitterDto.setSlots(slotDtos);

        return sitterDto;
    }

    @Override
    public void updateRequestStatus(Long veterinaryId, UserStatus status) {
        Optional<Veterinary> optionalVeterinary = veterinaryRepository.findById(veterinaryId);
        if (optionalVeterinary.isPresent()) {
            Veterinary veterinary = optionalVeterinary.get();
            veterinary.setStatus(status);
            veterinaryRepository.save(veterinary);
        } else {
            throw new ResourceNotFoundException("Veterinary not found with id: " + veterinaryId);
        }
    }

    @Transactional
    @Override
    public void deleteVeterinary(Long veterinaryId) {
        Veterinary veterinary = veterinaryRepository.findById(veterinaryId)
                .orElseThrow(() -> new RuntimeException("Veterinary not found"));
        appointmentRepository.deleteByVeterinaryVeterinaryId(veterinaryId);
        veterinaryRepository.deleteById(veterinaryId);
        userRepository.deleteByUserId(veterinary.getUser().getUserId());

    }

    @Override
    public Slot createSlot(Slot slot) {
        return slotRepository.save(slot);
    }

    @Override
    public List<Slot> getSlotsByVeterinary(Long userId) {
        return slotRepository.findByUserUserId(userId);
    }

    @Override
    public VeterinaryAppointment createAppointment(VeterinaryAppointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public void updateAppointmentStatus(Long appointmentId, AppointmentStatus status) {
        Optional<VeterinaryAppointment> optionalAppointment = appointmentRepository.findById(appointmentId);
        if (optionalAppointment.isPresent()) {
            VeterinaryAppointment appointment = optionalAppointment.get();
            appointment.setStatus(status);
            appointmentRepository.save(appointment);
        } else {
            throw new ResourceNotFoundException("Appointment not found with id: " + appointmentId);
        }
    }

    @Override
    public List<VeterinaryDto> getVeterinariesByStatus(UserStatus status) {
        List<Veterinary> veterinaries = veterinaryRepository.findByStatus(status);
        return veterinaries.stream()
                .map(veterinary -> modelMapper.map(veterinary, VeterinaryDto.class))
                .toList();
    }

    @Override
    public List<Veterinary> getVeterinariesByAreaId(Long areaId) {
        return veterinaryRepository.findByAreaAreaIdAndStatus(areaId, UserStatus.APPROVED);
    }

    @Override
    public VeterinaryDto getVeterinaryInfoWithSlotsByVeterinaryId(Long veterinaryId) {
        Veterinary veterinary = veterinaryRepository.findById(veterinaryId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Veterinary userId ID"));

        VeterinaryDto sitterDto = modelMapper.map(veterinary, VeterinaryDto.class);

        List<Slot> slots = slotRepository.findByUserUserId(veterinary.getUser().getUserId());

        List<SlotDto> slotDtos = slots.stream().map(slot -> {
            LocalDate today = LocalDate.now();

            boolean isBooked = appointmentRepository.existsByVeterinaryVeterinaryIdAndDateAndSlotSlotId(
                    veterinary.getVeterinaryId(), today, slot.getSlotId());
            SlotDto slotDto = new SlotDto();
            slotDto.setSlotId(slot.getSlotId());
            slotDto.setSlotTime(slot.getSlotTime());
            slotDto.setAvailable(!isBooked);
            return slotDto;
        }).toList();

        sitterDto.setSlots(slotDtos);

        return sitterDto;
    }

    public Veterinary updateVeterinary(Long veterinaryId, CreateVeterinaryRequest updateVeterinaryRequest) {

        Veterinary veterinary = veterinaryRepository.findById(veterinaryId)
                .orElseThrow(() -> new EntityNotFoundException("Veterinary not found with id: " + veterinaryId));

        veterinary.setSpecialization(updateVeterinaryRequest.getSpecialization());
        veterinary.setExperience(updateVeterinaryRequest.getExperience());
        veterinary.setLicenseNo(updateVeterinaryRequest.getLicenseNo());
        veterinary.setClinicName(updateVeterinaryRequest.getClinicName());
        veterinary.setClinicPhoneNo(updateVeterinaryRequest.getClinicPhoneNo());
        veterinary.setClinicAddress(updateVeterinaryRequest.getClinicAddress());
        veterinary.setNoOfSlots(updateVeterinaryRequest.getNoOfSlots());

        City city = cityRepository.findById(updateVeterinaryRequest.getCityId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "City not found with id: " + updateVeterinaryRequest.getCityId()));
        veterinary.setCity(city);

        Area area = areaRepository.findById(updateVeterinaryRequest.getAreaId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Area not found with id: " + updateVeterinaryRequest.getAreaId()));
        veterinary.setArea(area);

        return veterinaryRepository.save(veterinary);
    }
}
