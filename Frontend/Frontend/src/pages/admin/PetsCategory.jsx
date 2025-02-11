import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { getAllPetsCategories } from "../../api-request/pets-request";
import { createPetCategory, updateCategoryName } from "../../api-request/admin-request";
import Swal from "sweetalert2";
import { Form, Modal } from "react-bootstrap";

export default function PetsCategory() {
  const { register, reset, setValue, getValues } = useForm();
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [show, setShow] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const handleClose = () => {
    reset();
    setValue("categoryName", "");
    setCategoryToEdit(null);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const fetchCategories = async () => {
    try {
      const categoryResponse = await getAllPetsCategories();
      setCategories(categoryResponse.data);
      setFiltered(categoryResponse.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch category information", "error");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleViewCategory = (category) => {
    setValue("categoryName", category["categoryName"]);
    setCategoryToEdit(category);
    handleShow();
  };

  const handleAddCategory = async (data) => {
    try {
      const response = await createPetCategory({ categoryName: getValues("categoryName") });
      if (response.status) {
        Swal.fire("Success", "Category added successfully!", "success");
        fetchCategories();
      } else {
        Swal.fire("Error", "Failed to add category <br/>" + response.message, "error");
      }
      handleClose();
    } catch (error) {
      Swal.fire("Error", "Failed to add category", "error");
    }
  };

  const handleUpdateCategory = async (data) => {
    try {
      console.log(data);

      const response = await updateCategoryName(categoryToEdit.categoryId, getValues("categoryName"));
      if (response.status) {
        Swal.fire("Success", "Category updated successfully!", "success");
        fetchCategories();
        handleClose();
      } else {
        Swal.fire("Error", "Failed to update category <br/>" + response.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update category", "error");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Pets Categories</h3>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by Category Name"
          onChange={(event) => {
            const query = event.target.value.toLowerCase();
            const filteredCategories = categories.filter((category) => category["categoryName"].toLowerCase().includes(query));
            setFiltered(filteredCategories);
          }}
        />
        <button className="btn btn-primary" onClick={handleShow}>
          Add Category
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((category) => (
            <tr key={category["categoryId"]}>
              <td>{category["categoryName"]}</td>
              <td>
                <button className="btn btn-sm btn-info" onClick={() => handleViewCategory(category)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal size="lg" show={show} onHide={handleClose} backdrop="static" scrollable={true} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{categoryToEdit ? "Update Category" : "Add Category"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row mb-4">
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("categoryName", { required: true })}
                    defaultValue={categoryToEdit ? categoryToEdit.categoryName : ""}
                  />
                </Form.Group>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {categoryToEdit ? (
            <button className="btn btn-success" onClick={handleUpdateCategory}>
              Update
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleAddCategory}>
              Add
            </button>
          )}
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
