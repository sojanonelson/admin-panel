import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';  // Import icons from react-icons
import axios from 'axios';  // Import axios

const Account = ({
  _id,
  firstname,
  lastname,
  studentemail,
  password,
  age,
  gender,
  address1,
  address2,
  city,
  state,
  country,
  pincode,
  course,
  studentnumber,
  parentnumber,
  parentemail,
  createdAt,
  onEdit,   // Callback function for edit action
  refreshList  // Callback function to refresh the list
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/student/${_id}`);
      console.log(`Deleted account with ID: ${_id}`);
      // Refresh the list after deletion
      if (refreshList) refreshList();
    } catch (error) {
      console.error(`Error deleting account with ID: ${_id}`, error);
      // Optionally, handle error (e.g., show an error message)
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg">
          <span className="font-semibold">Name: </span>
          {firstname} {lastname}
        </div>
        <div className="text-lg">
          <span className="font-semibold">Email: </span>
          {studentemail}
        </div>
      </div>
      <div className="text-sm mb-4">
        <span className="font-semibold">Address: </span>
        {address1}, {address2}, {city}, {state}, {country} - {pincode}
      </div>
      <div className="text-sm mb-4">
        <span className="font-semibold">Course: </span>
        {course}
      </div>
      <div className="text-sm mb-4">
        <span className="font-semibold">Account Creation Date: </span>
        {new Date(createdAt).toLocaleDateString()}  {/* Format the date */}
      </div>
      <div className="flex justify-end space-x-4">
        <button onClick={() => onEdit(_id)} className="text-blue-500 hover:text-blue-700">
          <FaEdit size={20} />
        </button>
        <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
          <FaTrash size={20} />
        </button>
      </div>
    </div>
  );
};

export default Account;
