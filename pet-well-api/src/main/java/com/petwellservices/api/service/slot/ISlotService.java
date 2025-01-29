
package com.petwellservices.api.service.slot;

import java.util.List;

import com.petwellservices.api.entities.Slot;

public interface ISlotService {
    Slot createSlot(Long userId, Slot slot);

    Slot updateSlot(Long slotId, Slot updatedSlot);

    List<Slot> getSlotsByUserId(Long userId);

    void deleteSlot(Long slotId);
}
