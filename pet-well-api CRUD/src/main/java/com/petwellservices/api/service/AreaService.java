
package com.petwellservices.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.petwellservices.api.entities.Area;
import com.petwellservices.api.repository.AreaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AreaService implements IAreaService {
    private final AreaRepository areaRepository;

    @Override
    public Area getAreaById(Long areaId) {
        return areaRepository.findById(areaId).get();

    }

    @Override
    public List<Area> getAreas() {
        return areaRepository.findAll();
    }

    @Override
    public List<Area> getAreaByCityId(Long cityId) {
        throw new UnsupportedOperationException("Unimplemented method 'getAreaByCityId'");
    }

    @Override
    public Area createArea(Area area) {
        throw new UnsupportedOperationException("Unimplemented method 'createArea'");
    }

    @Override
    public void deleteArea(Long areaId) {
        throw new UnsupportedOperationException("Unimplemented method 'deleteArea'");
    }

}
