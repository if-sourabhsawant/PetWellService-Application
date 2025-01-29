import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchCitiesAndAreas, registerUser } from '../utils/fetchData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GroomerRegistration() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [filteredAreas, setFilteredAreas] = useState([]);
    const [filteredShopAreas, setFilteredShopAreas] = useState([]);

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
            setValue('areaId', ''); // Reset area when city changes
        }

        if (name === 'shopCityId') {
            const shopAreas = areas.filter((area) => area.cityId === parseInt(value));
            setFilteredShopAreas(shopAreas);
            setValue('shopAreaId', ''); // Reset shop area when city changes
        }
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
            roleId: 4,
            groomer: {
                shopName: oldObj.shopName,
                cityId: parseInt(oldObj.shopCityId),
                areaId: parseInt(oldObj.shopAreaId),
                shopPhoneNo: oldObj.shopPhoneNo,
                shopAddress: oldObj.shopAddress,
                noOfSlots: parseInt(oldObj.noOfSlots)
            }
        };
    };

    const onSubmit = async (data) => {
        try {
            const userData = transformToNewFormat(data);
            const response = await registerUser(userData);
            if (response.status) {
                toast.success('Groomer registered successfully');
            } else {
                toast.error('Failed to register groomer');
            }
        } catch (error) {
            toast.error(`An error occurred: ${error}`);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center my-5 w-50">
            <form onSubmit={handleSubmit(onSubmit)} className='border p-4 w-100'>
            <h2>Groomer Registration</h2>

                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        {...register('firstName', { required: 'First name is required' })}
                    />
                    {errors.firstName && <span className="text-danger">{errors.firstName.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        {...register('lastName', { required: 'Last name is required' })}
                    />
                    {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="phoneNo" className="form-label">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phoneNo"
                        {...register('phoneNo', { required: 'Phone number is required' })}
                    />
                    {errors.phoneNo && <span className="text-danger">{errors.phoneNo.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <span className="text-danger">{errors.password.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="aadharNo" className="form-label">Aadhar Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="aadharNo"
                        {...register('aadharNo', { required: 'Aadhar number is required' })}
                    />
                    {errors.aadharNo && <span className="text-danger">{errors.aadharNo.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        {...register('address', { required: 'Address is required' })}
                    />
                    {errors.address && <span className="text-danger">{errors.address.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="cityId" className="form-label">City</label>
                    <select
                        className="form-select"
                        id="cityId"
                        {...register('cityId', { required: 'City is required' })}
                        onChange={handleChange}
                    >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                            <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
                        ))}
                    </select>
                    {errors.cityId && <span className="text-danger">{errors.cityId.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="areaId" className="form-label">Area</label>
                    <select
                        className="form-select"
                        id="areaId"
                        {...register('areaId', { required: 'Area is required' })}
                        disabled={!filteredAreas.length}
                    >
                        <option value="">Select Area</option>
                        {filteredAreas.map((area) => (
                            <option key={area.areaId} value={area.areaId}>{area.areaName}</option>
                        ))}
                    </select>
                    {errors.areaId && <span className="text-danger">{errors.areaId.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="shopName" className="form-label">Shop Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="shopName"
                        {...register('shopName', { required: 'Shop name is required' })}
                    />
                    {errors.shopName && <span className="text-danger">{errors.shopName.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="shopCityId" className="form-label">Shop City</label>
                    <select
                        className="form-select"
                        id="shopCityId"
                        {...register('shopCityId', { required: 'Shop city is required' })}
                        onChange={handleChange}
                    >
                        <option value="">Select Shop City</option>
                        {cities.map((city) => (
                            <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
                        ))}
                    </select>
                    {errors.shopCityId && <span className="text-danger">{errors.shopCityId.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="shopAreaId" className="form-label">Shop Area</label>
                    <select
                        className="form-select"
                        id="shopAreaId"
                        {...register('shopAreaId', { required: 'Shop area is required' })}
                        disabled={!filteredShopAreas.length}
                    >
                        <option value="">Select Shop Area</option>
                        {filteredShopAreas.map((area) => (
                            <option key={area.areaId} value={area.areaId}>{area.areaName}</option>
                        ))}
                    </select>
                    {errors.shopAreaId && <span className="text-danger">{errors.shopAreaId.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="shopPhoneNo" className="form-label">Shop Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="shopPhoneNo"
                        {...register('shopPhoneNo', { required: 'Shop phone number is required' })}
                    />
                    {errors.shopPhoneNo && <span className="text-danger">{errors.shopPhoneNo.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="shopAddress" className="form-label">Shop Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="shopAddress"
                        {...register('shopAddress', { required: 'Shop address is required' })}
                    />
                    {errors.shopAddress && <span className="text-danger">{errors.shopAddress.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="noOfSlots" className="form-label">Number of Slots</label>
                    <input
                        type="number"
                        className="form-control"
                        id="noOfSlots"
                        {...register('noOfSlots', { required: 'Number of slots is required' })}
                    />
                    {errors.noOfSlots && <span className="text-danger">{errors.noOfSlots.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary">Register</button>
            </form>

            <ToastContainer />
        </div>
    );
}
