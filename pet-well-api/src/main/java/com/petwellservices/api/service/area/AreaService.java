
package com.petwellservices.api.service.area;

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
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAreaById'");
    }

    @Override
    public List<Area> getAreas() {
        return areaRepository.findAll();
    }

    @Override
    public List<Area> getAreaByCityId(Long cityId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAreaByCityId'");
    }

    @Override
    public Area createArea(Area area) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createArea'");
    }

    @Override
    public void deleteArea(Long areaId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteArea'");
    }

}
