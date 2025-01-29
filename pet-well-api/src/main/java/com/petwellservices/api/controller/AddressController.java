package com.petwellservices.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petwellservices.api.dto.AreaDto;
import com.petwellservices.api.entities.Area;
import com.petwellservices.api.response.ApiResponse;
import com.petwellservices.api.service.area.IAreaService;
import com.petwellservices.api.service.city.ICityService;

import lombok.RequiredArgsConstructor;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/address")
public class AddressController {
    final IAreaService areaService;
    final ICityService cityService;

    @GetMapping("/cities-areas")
    public ResponseEntity<ApiResponse> getCitiesAreas() {
        try {
            Map<String, Object> response = new HashMap<>();
            response.put("cities", cityService.getCities());

            List<Area> areas = areaService.getAreas();

            List<AreaDto> dto = areas.stream()
                    .map(this::convertAreaToDto).toList();
            response.put("areas", dto);
            return ResponseEntity.ok(new ApiResponse("success", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("error", e.getMessage()));

        }
    }

    public AreaDto convertAreaToDto(Area area) {
        AreaDto dto = new AreaDto();
        dto.setAreaId(area.getAreaId());
        dto.setAreaName(area.getAreaName());
        dto.setCityId(area.getCity().getCityId());
        return dto;
    }

}
