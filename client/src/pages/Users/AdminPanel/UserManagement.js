import React, { useState, useEffect, useContext } from 'react';
import DataTable from 'react-data-table-component';
import { fetchAllUsers } from './AdminFunctions';
import { AuthContext } from '../../../context/authContext';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  // Fetching user request by user id
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllUsers();
      //console.log(data);
      setUsers(data);
    };

    fetchData();
  }, []);

  const columns = [
    { name: 'ID', selector: (row) => row.ID, sortable: true, wrap: true },
    {
      name: 'First Name',
      selector: (row) => row.first_name,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Last Name',
      selector: (row) => row.last_name,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
    },
    { name: 'City', selector: (row) => row.city, sortable: true, wrap: true },
    {
      name: 'Address',
      selector: (row) => row.address,
      sortable: true,
      wrap: true,
    },
    { name: 'Phone', selector: (row) => row.phone, sortable: true, wrap: true },
    {
      name: 'Amount',
      selector: (row) => row.amount || '-',
      sortable: true,
      wrap: true,
    },
    {
      name: 'Active',
      selector: (row) => (row.active ? 'Yes' : 'No'),
      sortable: true,
      wrap: true,
    },
  ];

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4">All Users:</h2>
      {users.length > 0 ? (
        <div className="mx-auto w-full px-4 md:max-w-3xl lg:max-w-4xl xl:max-w-6xl text-center">
          <DataTable
            columns={columns}
            data={users}
            striped
            highlightOnHover
            pagination
            className="border w-full"
          />
        </div>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default UserManagement;
