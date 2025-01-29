import React from 'react';

const UserCard = ({ firstName, lastName, role }) => {
  return (
    <div className="mt-5 d-flex justify-content-center align-items-center m-auto">
      <div className="card border-primary" style={{ width: '18rem' }}>
        <div className="card-body text-center">
          <h5 className="card-title">{firstName} {lastName}</h5>
          <p className="card-text">Role: {role}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
