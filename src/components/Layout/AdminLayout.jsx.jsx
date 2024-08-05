import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher, FaBuilding } from 'react-icons/fa';
import axios from 'axios';

const AdminLayout = () => {
  const [counts, setCounts] = useState({ student: 0, tutor: 0, franchise: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accountCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/accounts/count');
      setCounts(response.data);
      console.log("Account Count:", response.data)
    } catch (error) {
      setError('Failed to load account counts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    accountCount();
  }, []);

  return (
    <div className="admin-layout min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-1">
        <aside className="bg-white shadow-lg p-6 w-1/4 min-h-screen">
          <ul className="space-y-4">
            <li className="text-xl font-semibold hover:text-blue-600 flex items-center">
              <FaUserGraduate className="mr-2" />
              <Link to="/student">Student Management</Link>
            </li>
            <li className="text-xl font-semibold hover:text-blue-600 flex items-center">
              <FaChalkboardTeacher className="mr-2" />
              <Link to="/admin/tutor">Tutor Management</Link>
            </li>
            <li className="text-xl font-semibold hover:text-blue-600 flex items-center">
              <FaBuilding className="mr-2" />
              <Link to="/admin/franchise">Franchise Management</Link>
            </li>
          </ul>
        </aside>

        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <>
                <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform">
                  <FaUserGraduate className="text-blue-600 text-6xl mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-4">Students</h2>
                  <div className="text-4xl font-semibold text-blue-600 mb-2">{counts.studentCount}</div>
                  <Link to="/student" className="text-blue-600 underline">Manage Students</Link>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform">
                  <FaChalkboardTeacher className="text-blue-600 text-6xl mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-4">Tutors</h2>
                  <div className="text-4xl font-semibold text-blue-600 mb-2">{counts.tutorCount}</div>
                  <Link to="/admin/tutor" className="text-blue-600 underline">Manage Tutors</Link>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform">
                  <FaBuilding className="text-blue-600 text-6xl mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-4">Franchises</h2>
                  <div className="text-4xl font-semibold text-blue-600 mb-2">{counts.franchiserCount}</div>
                  <Link to="/admin/franchise" className="text-blue-600 underline">Manage Franchises</Link>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform">
                  <FaBuilding className="text-blue-600 text-6xl mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-4">Admin</h2>
                  <div className="text-4xl font-semibold text-blue-600 mb-2">{counts.adminCount}</div>
                  <Link to="/admin/franchise" className="text-blue-600 underline">Admin controls</Link>
                </div>
              </>
            )}
          </div>

          <div className="mt-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
