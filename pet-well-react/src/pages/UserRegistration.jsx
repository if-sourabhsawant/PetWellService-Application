import React, { useState, useEffect } from 'react';
import { fetchCategoriesAndBreeds, fetchCitiesAndAreas, registerUser } from '../utils/fetchData';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
const UserRegistration = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [filteredAreas, setFilteredAreas] = useState([]); // For filtered areas
    const [categories, setCategories] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const selectedCityId = watch('cityId'); // Watch cityId for changes

    function transformToNewFormat(oldObj) {
        return {
            firstName: oldObj.firstName,
            lastName: oldObj.lastName,
            phoneNo: oldObj.phoneNo,
            password: oldObj.password,
            email: oldObj.email,
            aadharNo: oldObj.aadharNo,
            address: oldObj.address,
            cityId: oldObj.cityId,
            areaId: oldObj.areaId,
            roleId:1,
            pet: {
                petName: oldObj.petName,
                petAge: oldObj.petAge,
                categoryId: oldObj.categoryId,
                breedId: oldObj.breedId,
            }
        };
    }
    // Fetch cities and areas
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const { cities, areas } = await fetchCitiesAndAreas();
            const { categories, breeds } = await fetchCategoriesAndBreeds();
            setCities(cities);
            setAreas(areas);
            setCategories(categories);
            setBreeds(breeds);
            setLoading(false);
        };
        getData();
    }, []);

    // Filter areas based on selected cityId
    useEffect(() => {
        if (selectedCityId) {
            const filtered = areas.filter(area => area.cityId === parseInt(selectedCityId));
            setFilteredAreas(filtered);
        } else {
            setFilteredAreas([]);
        }
    }, [selectedCityId, areas]);

    const onSubmit = async (data) => {
        console.log('User Registration Data:', data);
        let response = await registerUser(transformToNewFormat(data));
        if(response.status){
            toast.success('User Register Successfully', );
        }else{
            toast.error('Error registering user: '+ response.error,);
            console.error('Error registering user:', response.error);
        }
    };

    return (
        !loading && (
            <div className="container d-flex justify-content-center align-items-center my-5 w-50">
                <form onSubmit={handleSubmit(onSubmit)} className="border p-4 w-100">
                    <h3>User Registration</h3>

                    {/* First Name */}
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            className="form-control"
                            {...register('firstName', { required: 'First name is required' })}
                        />
                        {errors.firstName && <small className="text-danger">{errors.firstName.message}</small>}
                    </div>

                    {/* Last Name */}
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            className="form-control"
                            {...register('lastName', { required: 'Last name is required' })}
                        />
                        {errors.lastName && <small className="text-danger">{errors.lastName.message}</small>}
                    </div>

                    {/* Phone Number */}
                    <div className="mb-3">
                        <label htmlFor="phoneNo" className="form-label">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNo"
                            className="form-control"
                            {...register('phoneNo', { required: 'Phone number is required' })}
                        />
                        {errors.phoneNo && <small className="text-danger">{errors.phoneNo.message}</small>}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && <small className="text-danger">{errors.password.message}</small>}
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && <small className="text-danger">{errors.email.message}</small>}
                    </div>

                    {/* Aadhar Number */}
                    <div className="mb-3">
                        <label htmlFor="aadharNo" className="form-label">Aadhar Number</label>
                        <input
                            type="text"
                            id="aadharNo"
                            className="form-control"
                            {...register('aadharNo', { required: 'Aadhar number is required' })}
                        />
                        {errors.aadharNo && <small className="text-danger">{errors.aadharNo.message}</small>}
                    </div>

                    {/* Address */}
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            id="address"
                            className="form-control"
                            {...register('address', { required: 'Address is required' })}
                        />
                        {errors.address && <small className="text-danger">{errors.address.message}</small>}
                    </div>

                    {/* City */}
                    <div className="mb-3">
                        <label htmlFor="cityId" className="form-label">City</label>
                        <select
                            id="cityId"
                            className="form-select"
                            {...register('cityId', { required: 'City is required' })}
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city.cityId} value={city.cityId}>
                                    {city.cityName}
                                </option>
                            ))}
                        </select>
                        {errors.cityId && <small className="text-danger">{errors.cityId.message}</small>}
                    </div>

                    {/* Area */}
                    <div className="mb-3">
                        <label htmlFor="areaId" className="form-label">Area</label>
                        <select
                            id="areaId"
                            className="form-select"
                            {...register('areaId', { required: 'Area is required' })}
                        >
                            <option value="">Select Area</option>
                            {filteredAreas.map((area) => (
                                <option key={area.areaId} value={area.areaId}>
                                    {area.areaName}
                                </option>
                            ))}
                        </select>
                        {errors.areaId && <small className="text-danger">{errors.areaId.message}</small>}
                    </div>

                    {/* Pet Name */}
                    <div className="mb-3">
                        <label htmlFor="petName" className="form-label">Pet Name</label>
                        <input
                            type="text"
                            id="petName"
                            className="form-control"
                            {...register('petName', { required: 'Pet name is required' })}
                        />
                        {errors.petName && <small className="text-danger">{errors.petName.message}</small>}
                    </div>

                    {/* Pet Age */}
                    <div className="mb-3">
                        <label htmlFor="petAge" className="form-label">Pet Age</label>
                        <input
                            type="number"
                            id="petAge"
                            className="form-control"
                            {...register('petAge', { required: 'Pet age is required' })}
                        />
                        {errors.petAge && <small className="text-danger">{errors.petAge.message}</small>}
                    </div>

                    {/* Category */}
                    <div className="mb-3">
                        <label htmlFor="categoryId" className="form-label">Category</label>
                        <select
                            id="categoryId"
                            className="form-select"
                            {...register('categoryId', { required: 'Category is required' })}
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                        {errors.categoryId && <small className="text-danger">{errors.categoryId.message}</small>}
                    </div>

                    {/* Breed */}
                    <div className="mb-3">
                        <label htmlFor="breedId" className="form-label">Breed</label>
                        <select
                            id="breedId"
                            className="form-select"
                            {...register('breedId', { required: 'Breed is required' })}
                        >
                            <option value="">Select Breed</option>
                            {breeds.map((breed) => (
                                <option key={breed.breedId} value={breed.breedId}>
                                    {breed.breedName}
                                </option>
                            ))}
                        </select>
                        {errors.breedId && <small className="text-danger">{errors.breedId.message}</small>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                <ToastContainer/>
            </div>
        )
    );
};

export default UserRegistration;
