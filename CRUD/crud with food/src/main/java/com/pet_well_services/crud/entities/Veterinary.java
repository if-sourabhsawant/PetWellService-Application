package com.pet_well_services.crud.entities;

import com.pet_well_services.crud.enums.UserStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "veterinary")
public class Veterinary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "veterinary_id")
    private Long veterinaryId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "specialization", nullable = false)
    private String specialization;

    @Column(name = "experience", nullable = false)
    private Float experience;

    @Column(name = "license_no", nullable = false, unique = true)
    private String licenseNo;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    @ManyToOne
    @JoinColumn(name = "area_id", nullable = false)
    private Area area;

    @Column(name = "clinic_name", nullable = false)
    private String clinicName;

    @Column(name = "clinic_phone_no", nullable = false)
    private String clinicPhoneNo;

    @Column(name = "clinic_address", nullable = false)
    private String clinicAddress;

    @Column(name = "no_of_slots", nullable = false)
    private Integer noOfSlots;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserStatus status;

}
