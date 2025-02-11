
package com.pet_well_services.crud.service.area;

import java.util.List;

import com.pet_well_services.crud.entities.Area;


public interface IAreaService {
    Area getAreaById(Long areaId);

    List<Area> getAreas();
    List<Area> getAreaByCityId(Long cityId);

    Area createArea(Area area);

    void deleteArea(Long areaId);
}
