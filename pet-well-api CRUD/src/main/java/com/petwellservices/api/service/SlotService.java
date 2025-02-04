
package com.petwellservices.api.service;

import java.time.LocalTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.petwellservices.api.entities.Slot;
import com.petwellservices.api.entities.User;
import com.petwellservices.api.enums.UserType;
import com.petwellservices.api.exception.InvalidResourceException;
import com.petwellservices.api.exception.ResourceNotFoundException;
import com.petwellservices.api.repository.GroomerRepository;
import com.petwellservices.api.repository.SitterRepository;
import com.petwellservices.api.repository.SlotRepository;
import com.petwellservices.api.repository.UserRepository;
import com.petwellservices.api.repository.VeterinaryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SlotService implements ISlotService {

    private final SlotRepository slotRepository;

    private final UserRepository userRepository;

    private final VeterinaryRepository veterinaryRepository;
    private final SitterRepository sitterRepository;
    private final GroomerRepository groomerRepository;

    public Slot createSlot(Long userId, Slot slot) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        if (isSlotAlreadyExists(userId, slot.getSlotTime(), slot.getUserType())) {
            throw new InvalidResourceException("Slot already exists for the given time and user type.");
        }

        if (slot.getUserType().name().equalsIgnoreCase("GROOMER")
                && slotRepository.countByUserUserId(userId) >= groomerRepository.findByUserUserId(userId).get()
                        .getNoOfSlots()) {

            throw new InvalidResourceException("Reach Max Slots");

        }
        if (slot.getUserType().name().equalsIgnoreCase("SITTER")
                && slotRepository.countByUserUserId(userId) >= sitterRepository.findByUserUserId(userId).get()
                        .getNoOfSlots()) {

            throw new InvalidResourceException("Reach Max Slots");

        }

        if (slot.getUserType().name().equalsIgnoreCase("VETERINARY")
                && slotRepository.countByUserUserId(userId) >= veterinaryRepository.findByUserUserId(userId).get()
                        .getNoOfSlots()) {

            throw new InvalidResourceException("Reach Max Slots");

        }

        slot.setUser(user);
        return slotRepository.save(slot);
    }

    public Slot updateSlot(Long slotId, Slot updatedSlot) {
        Slot existingSlot = slotRepository.findById(slotId).orElseThrow(() -> new ResourceNotFoundException("Slot not found with ID: " + slotId));

        if (isSlotAlreadyExists(existingSlot.getUser().getUserId(), updatedSlot.getSlotTime(),
                updatedSlot.getUserType(), slotId)) {
            throw new RuntimeException("Slot already exists for the given time and user type.");
        }

        existingSlot.setSlotTime(updatedSlot.getSlotTime());

        return slotRepository.save(existingSlot);
    }

    public List<Slot> getSlotsByUserId(Long userId) {
        return slotRepository.findByUserUserId(userId);
    }

    public void deleteSlot(Long slotId) {
        Slot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found with ID: " + slotId));

        slotRepository.delete(slot);
    }

    private boolean isSlotAlreadyExists(Long userId, LocalTime slotTime, UserType userType) {
        return slotRepository.existsByUserUserIdAndSlotTimeAndUserType(userId, slotTime, userType);
    }

    private boolean isSlotAlreadyExists(Long userId, LocalTime slotTime, UserType userType, Long excludeSlotId) {
        return slotRepository.existsByUserUserIdAndSlotTimeAndUserTypeAndSlotIdNot(userId, slotTime, userType,
                excludeSlotId);
    }
}
