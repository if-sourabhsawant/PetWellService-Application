import React, { useEffect, useState } from 'react';
import DynamicDataTable from '../../components/DynamicDataTable';
import { deleteUser, fetchUsers } from '../../utils/admin-api-request';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { toast, ToastContainer } from 'react-toastify';

export default function ManageUserList() {
  const columns = [
    { name: 'userId', width: '10%', id: "userId" },
    { name: 'firstName', width: '20%', id: "firstName" },
    { name: 'lastName', width: '10%', id: "lastName" },
    { name: 'phoneNo', width: '20%', id: "phoneNo" },
    { name: 'email', width: '20%', id: "email" },
  ];

  const [rowData, setRowData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user data

  const handleView = (row) => {
    setSelectedUser(row); // Set selected user data
    const modal = new Modal(document.getElementById('userModal'));
    modal.show(); // Show Bootstrap modal
  };

  const handleDelete = async (row) => {
    const response = await deleteUser(row.userId);
    if (response.status) {
      console.log(response.data);
      toast.success('Delete successful');
      window.location.reload();
    } else {
      console.error('Failed to Delete', response.error);
      toast.error('Failed to Delete');
    }
  };

  const actions = {
    view: handleView,
    delete: handleDelete,
  };
  async function getData() {
    const userData = await fetchUsers();
    setRowData(userData);
  }
  useEffect(() => {
    
    getData();
  }, []);

  return (
    <div>
      <ToastContainer/>
      <h3 className='mb-3'>Users</h3>
      {rowData.length > 0 ? <DynamicDataTable columns={columns} rows={rowData} actions={actions} />:<>No User Found</>}

      {/* Bootstrap Modal */}
      <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userModalLabel">User Information</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedUser ? (
                <div>
                  <p><strong>User ID:</strong> {selectedUser.userId}</p>
                  <p><strong>First Name:</strong> {selectedUser.firstName}</p>
                  <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
                  <p><strong>Phone Number:</strong> {selectedUser.phoneNo}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Password:</strong> {selectedUser.password}</p>
                  <p><strong>Aadhar Number:</strong> {selectedUser.aadharNo}</p>
                  <p><strong>Address:</strong> {selectedUser.address}</p>
                  <p><strong>City:</strong> {selectedUser.city.cityName}</p>
                  <p><strong>Area:</strong> {selectedUser.area.areaName}</p>
                  <p><strong>Role:</strong> {selectedUser.role.roleName}</p>
                </div>
              ) : (
                <p>Loading user information...</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
