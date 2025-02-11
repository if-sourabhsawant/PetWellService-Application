import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllPetsCategoriesAndBreeds, getPetDetailsByUserId, updatePetsById } from "../../api-request/pets-request";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { Button, Form, Modal } from "react-bootstrap";

export default function UserPets() {
  const userData = useSelector((state) => state.user.userInfo);
  const [pets, setPets] = useState([]);
  const { register, handleSubmit, setValue, reset } = useForm();
  const [categories, setCategories] = useState([]);

  const [show, setShow] = useState(false);
  function handleClose() {
    reset();
    setShow(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(params) {
    const response = await getPetDetailsByUserId(userData.userId);
    console.log(response);
    if (response.status) {
      setPets(response.data.pets);
    }
    const response1 = await getAllPetsCategoriesAndBreeds();
    if (response1.status) {
      setCategories(response1.data.categories);
    
    } else {
      toast.error("Failed to load categories.");
    }
  }

  const onSubmit = async (data) => {
    const response = await updatePetsById(data.petId, data);
    if (response.status) {
      toast.success("Pet details updated successfully!");
      handleClose();
      fetchData();
    } else {
      toast.error(response.message);
    }
  };

  function handelEdit(data) {
    setValue("petId", data.petId);
    setValue("petName", data.petName);
    setValue("petAge", data.petAge);
    setValue("categoryId", data.category.categoryId);
    setShow(true);
  }

  return (
    <div className="container">
      <div>
        <ToastContainer />
        <h3>Pet List</h3>
        {pets.length > 0 ? (
          <div className="row">
            {pets.map((pet) => (
              <div key={pet.petId} className="col-md-6 mb-4">
                <div className="card p-3 shadow-sm">
                  <h5 className="card-title">Pet Name: {pet.petName}</h5>
                  <p>
                    <strong>Pet Age:</strong> {pet.petAge} years
                  </p>
                  <p>
                    <strong>Owner:</strong> {pet.userName}
                  </p>
                  <p>
                    <strong>Category:</strong> {pet.category.categoryName}
                  </p>
                  

                  <div className="d-flex justify-content-end ">
                    <button className="btn btn-warning m-1" onClick={() => handelEdit(pet)}>
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No pets available</p>
        )}
      </div>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Pet Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Pet Name</Form.Label>
              <Form.Control type="text" {...register("petName", { required: "Pet name is required" })} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Pet Age</Form.Label>
              <Form.Control type="number" {...register("petAge", { required: "Pet age is required", min: 0 })} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select {...register("categoryId", { required: "Category is required" })}>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.categoryName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

           

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Update Pet
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
