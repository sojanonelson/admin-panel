import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Make sure to install axios if you haven't already
import Account from '../components/common/Account';
import AccountForm from '../components/common/AccountForm';

const StudentAccount = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  

  // Fetch the list of students
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/getAllAccounts/student');
    
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching student list:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to refresh the student list
  const refreshList = () => {
    fetchStudents();
  };

  return (
    <div className="p-4 flex flex-col gap-2">
      <div className='flex flex-row justify-between'>
        <h1 className='text-2xl'>All Student Accounts</h1>
        <button
          className='bg-green-600 text-white p-2 rounded-lg'
          onClick={() => setIsModalOpen(true)}
        >
          Create account
        </button>
      </div>

      {students.map((student, index) => (
        <Account key={index} {...student} />
      ))}

      <AccountForm
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        refreshList={refreshList}
      />
    </div>
  );
};

export default StudentAccount;
