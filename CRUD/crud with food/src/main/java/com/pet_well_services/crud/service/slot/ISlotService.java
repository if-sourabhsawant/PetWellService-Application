
package com.pet_well_services.crud.service.slot;

import java.util.List;

import com.pet_well_services.crud.entities.Slot;

public interface ISlotService {
    Slot createSlot(Long userId, Slot slot);

    Slot updateSlot(Long slotId, Slot updatedSlot);

    List<Slot> getSlotsByUserId(Long userId);

    void deleteSlot(Long slotId);
}
