import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchCitiesAndAreas, registerUser } from '../utils/fetchData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SitterRegistration() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [filteredAreas, setFilteredAreas] = useState([]);
    const [filteredCenterAreas, setFilteredCenterAreas] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const { cities, areas } = await fetchCitiesAndAreas();
            setCities(cities);
            setAreas(areas);
        };
        getData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cityId') {
            const cityAreas = areas.filter((area) => area.cityId === parseInt(value));
            setFilteredAreas(cityAreas);
            setValue('areaId', '');  // Clear selected area
        }

        if (name === 'centerCityId') {
            const centerAreas = areas.filter((area) => area.cityId === parseInt(value));
            setFilteredCenterAreas(centerAreas);
            setValue('centerAreaId', '');  // Clear selected center area
        }
    };

    function transformToNewFormat(formData) {
        return {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNo: formData.phoneNo,
            password: formData.password,
            email: formData.email,
            aadharNo: formData.aadharNo,
            address: formData.address,
            cityId: parseInt(formData.cityId),
            areaId: parseInt(formData.areaId),
            roleId: 3,
            sitter: {
                centerPhoneNo: formData.centerPhoneNo,
                centerAddress: formData.centerAddress,
                cityId: parseInt(formData.centerCityId),
                areaId: parseInt(formData.centerAreaId),
                noOfSlots: parseInt(formData.noOfSlots)
            }
        };
    }

    const onSubmit = async (data) => {
        try {
            let userData = transformToNewFormat(data);
            const response = await registerUser(userData);

            if (response.status) {
                toast.success('Sitter registered successfully');
            } else {
                toast.error('Failed to register sitter');
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center my-5 w-50">
            <form onSubmit={handleSubmit(onSubmit)} className='border p-4 w-100'>
            <h2>Sitter Registration</h2>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        {...register('firstName', { required: true })}
                    />
                    {errors.firstName && <p className="text-danger">First Name is required</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        {...register('lastName', { required: true })}
                    />
                    {errors.lastName && <p className="text-danger">Last Name is required</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="phoneNo" className="form-label">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phoneNo"
                        {...register('phoneNo', { required: true })}
                    />
                    {errors.phoneNo && <p className="text-danger">Phone Number is required</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        {...register('password', { required: true })}
                    />
                    {errors.password && <p className="text-danger">Password is required</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        {...register('email', { required: true })}
                    />
                    {errors.email && <p className="text-danger">Email is required</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="aadharNo" className="form-label">Aadhar Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="aadharNo"
                        {...register('aadharNo', { required: true })}
                    />
                    {errors.aadharNo && <p className="text-danger">Aadhar Number is required</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        {...register('address', { required: true })}
                    />
                    {errors.address && <p className="text-danger">Address is required</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="cityId" className="form-label">City</label>
                    <select
                        className="form-select"
                        id="cityId"
                        {...register('cityId', { required: true })}
                        onChange={handleChange}
                    >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                            <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
                        ))}
                    </select>
                    {errors.cityId && <p className="text-danger">City is required</p>}
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
                    {errors.areaId && <p className="text-danger">Area is required</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="centerPhoneNo" className="form-label">Center Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="centerPhoneNo"
                        {...register('centerPhoneNo', { required: true })}
                    />
                    {errors.centerPhoneNo && <p className="text-danger">Center Phone Number is required</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="centerAddress" className="form-label">Center Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="centerAddress"
                        {...register('centerAddress', { required: true })}
                    />
                    {errors.centerAddress && <p className="text-danger">Center Address is required</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="centerCityId" className="form-label">Center City</label>
                    <select
                        className="form-select"
                        id="centerCityId"
                        {...register('centerCityId', { required: true })}
                        onChange={handleChange}
                    >
                        <option value="">Select Center City</option>
                        {cities.map((city) => (
                            <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
                        ))}
                    </select>
                    {errors.centerCityId && <p className="text-danger">Center City is required</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="centerAreaId" className="form-label">Center Area</label>
                    <select
                        className="form-select"
                        id="centerAreaId"
                        {...register('centerAreaId', { required: true })}
                        disabled={!filteredCenterAreas.length}
                    >
                        <option value="">Select Center Area</option>
                        {filteredCenterAreas.map((area) => (
                            <option key={area.areaId} value={area.areaId}>{area.areaName}</option>
                        ))}
                    </select>
                    {errors.centerAreaId && <p className="text-danger">Center Area is required</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="noOfSlots" className="form-label">Number of Slots</label>
                    <input
                        type="number"
                        className="form-control"
                        id="noOfSlots"
                        {...register('noOfSlots', { required: true })}
                    />
                    {errors.noOfSlots && <p className="text-danger">Number of Slots is required</p>}
                </div>

                <button type="submit" className="btn btn-primary">Register</button>
            </form>

            <ToastContainer />
        </div> 
    );
}
