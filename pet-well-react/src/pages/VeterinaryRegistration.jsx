import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchCitiesAndAreas, registerUser } from '../utils/fetchData';
import { ToastContainer, toast } from 'react-toastify';

export default function VeterinaryRegistration() {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [filteredAreas, setFilteredAreas] = useState([]);
    const [filteredHospitalAreas, setFilteredHospitalAreas] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const { cities, areas } = await fetchCitiesAndAreas();
            setCities(cities);
            setAreas(areas);
        };
        getData();
    }, []);

    const handleCityChange = (e) => {
        const cityId = e.target.value;
        const cityAreas = areas.filter((area) => area.cityId === parseInt(cityId));
        setFilteredAreas(cityAreas);
        setValue('areaId', '');  // Reset the area field
    };

    const handleHospitalCityChange = (e) => {
        const cityId = e.target.value;
        const cityAreas = areas.filter((area) => area.cityId === parseInt(cityId));
        setFilteredHospitalAreas(cityAreas);
        setValue('hospitalAreaId', '');  // Reset the hospital area field
    };

    const transformToNewFormat = (oldObj) => {
        return {
            firstName: oldObj.firstName,
            lastName: oldObj.lastName,
            phoneNo: oldObj.phoneNo,
            password: oldObj.password,
            email: oldObj.email,
            aadharNo: oldObj.aadharNo,
            address: oldObj.address,
            cityId: parseInt(oldObj.cityId),
            areaId: parseInt(oldObj.areaId),
            roleId: 2,
            veterinary: {
                specialization: oldObj.specialization,
                experience: parseFloat(oldObj.experience),
                licenseNo: oldObj.licenseNo,
                cityId: parseInt(oldObj.hospitalCityId),
                areaId: parseInt(oldObj.hospitalAreaId),
                clinicName: oldObj.clinicName,
                clinicPhoneNo: oldObj.clinicPhoneNo,
                clinicAddress: oldObj.clinicAddress,
                noOfSlots: parseInt(oldObj.noOfSlots)
            }
        };
    };

    const onSubmit = async (data) => {
        try {
            const userData = transformToNewFormat(data);
            const response = await registerUser(userData);
            if (response.status) {
                toast.success('Veterinary registered successfully',);

            } else {
                toast.error('Error registering user: ' + response.error.response.data.data,);
                console.error(response.error);
                

            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center my-5 w-50">
            <ToastContainer/>
            <form onSubmit={handleSubmit(onSubmit)} className='border p-4 w-100'>
                <h2>Veterinary Registration</h2>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        {...register('firstName', { required: true })}
                    />
                    {errors.firstName && <span className="text-danger">First Name is required</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        {...register('lastName', { required: true })}
                    />
                    {errors.lastName && <span className="text-danger">Last Name is required</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="phoneNo" className="form-label">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phoneNo"
                        {...register('phoneNo', { required: true })}
                    />
                    {errors.phoneNo && <span className="text-danger">Phone Number is required</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        {...register('password', { required: true })}
                    />
                    {errors.password && <span className="text-danger">Password is required</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        {...register('email', { required: true })}
                    />
                    {errors.email && <span className="text-danger">Email is required</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="aadharNo" className="form-label">Aadhar Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="aadharNo"
                        {...register('aadharNo', { required: true })}
                    />
                    {errors.aadharNo && <span className="text-danger">Aadhar Number is required</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        {...register('address', { required: true })}
                    />
                    {errors.address && <span className="text-danger">Address is required</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="cityId" className="form-label">City</label>
                    <select
                        className="form-select"
                        id="cityId"
                        {...register('cityId', { required: true })}
                        onChange={handleCityChange}
                    >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                            <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
                        ))}
                    </select>
                    {errors.cityId && <span className="text-danger">City is required</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="areaId" className="form-label">Area</label>
                    <select
                        className="form-select"
                        id="areaId"
                        {...register('areaId', { required: true })}
                        disabled={!filteredAreas.length}
                    >
                        <option value="">Select Area</option>
                        {filteredAreas.map((area) => (
                            <option key={area.areaId} value={area.areaId}>{area.areaName}</option>
                        ))}
                    </select>
                    {errors.areaId && <span className="text-danger">Area is required</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="specialization" className="form-label">Specialization</label>
                    <input
                        type="text"
                        className="form-control"
                        id="specialization"
                        {...register('specialization', { required: true })}
                    />
                    {errors.specialization && <span className="text-danger">Specialization is required</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="experience" className="form-label">Experience (in years)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="experience"
                        {...register('experience', { required: true })}
                    />
                    {errors.experience && <span className="text-danger">Experience is required</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="licenseNo" className="form-label">License Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="licenseNo"
                        {...register('licenseNo', { required: true })}
                    />
                    {errors.licenseNo && <span className="text-danger">License Number is required</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="clinicName" className="form-label">Clinic Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="clinicName"
                        {...register('clinicName', { required: true })}
                    />
                    {errors.clinicName && <span className="text-danger">Clinic Name is required</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="clinicPhoneNo" className="form-label">Clinic Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="clinicPhoneNo"
                        {...register('clinicPhoneNo', { required: true })}
                    />
                    {errors.clinicPhoneNo && <span className="text-danger">Clinic Phone Number is required</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="clinicAddress" className="form-label">Clinic Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="clinicAddress"
                        {...register('clinicAddress', { required: true })}
                    />
                    {errors.clinicAddress && <span className="text-danger">Clinic Address is required</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="hospitalCityId" className="form-label">Hospital City</label>
                    <select
                        className="form-select"
                        id="hospitalCityId"
                        {...register('hospitalCityId', { required: true })}
                        onChange={handleHospitalCityChange}
                    >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                            <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
                        ))}
                    </select>
                    {errors.hospitalCityId && <span className="text-danger">City is required</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="hospitalAreaId" className="form-label">Hospital Area</label>
                    <select
                        className="form-select"
                        id="hospitalAreaId"
                        {...register('hospitalAreaId', { required: true })}
                        disabled={!filteredHospitalAreas.length}
                    >
                        <option value="">Select Area</option>
                        {filteredHospitalAreas.map((area) => (
                            <option key={area.areaId} value={area.areaId}>{area.areaName}</option>
                        ))}
                    </select>
                    {errors.hospitalAreaId && <span className="text-danger">Area is required</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="noOfSlots" className="form-label">Number of Slots</label>
                    <input
                        type="number"
                        className="form-control"
                        id="noOfSlots"
                        {...register('noOfSlots', { required: true })}
                    />
                    {errors.noOfSlots && <span className="text-danger">Number of Slots is required</span>}
                </div>

                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}
