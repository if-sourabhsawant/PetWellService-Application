
package com.petwellservices.api.service;

import java.util.List;

import com.petwellservices.api.entities.Area;


public interface IAreaService {
    Area getAreaById(Long areaId);

    List<Area> getAreas();
    List<Area> getAreaByCityId(Long cityId);

    Area createArea(Area area);

    void deleteArea(Long areaId);
}
