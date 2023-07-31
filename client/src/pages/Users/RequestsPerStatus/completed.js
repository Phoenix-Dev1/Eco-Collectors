import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/authContext';
import DataTable from 'react-data-table-component';
import { fetchUserRequests, fetchRecyclerDetails } from '../UserFunctions';

const Completed = () => {
  const { currentUser } = useContext(AuthContext);
  const [completedRequests, setCompletedRequests] = useState([]);

  // Fetching user request by user id
  useEffect(() => {
    const fetchData = async () => {
      const userId = currentUser.ID;
      const data = await fetchUserRequests(userId);
      setCompletedRequests(data.filter((request) => request.status === 3));
    };

    fetchData();
  }, [currentUser]);

  // fetching recycler details based on recycler id in user_request table
  useEffect(() => {
    const fetchRecyclerData = async () => {
      const recyclerIds = completedRequests.map(
        (request) => request.recycler_id
      );
      const recyclerDetails = await Promise.all(
        recyclerIds.map((recyclerId) => fetchRecyclerDetails(recyclerId))
      );
      setCompletedRequests((prevCompletedRequests) => {
        const updatedCompletedRequests = prevCompletedRequests.map(
          (request, index) => {
            const recyclerDetail = recyclerDetails[index];
            if (recyclerDetail && recyclerDetail.length > 0) {
              request.recycler = recyclerDetail[0];
            }
            return request;
          }
        );
        return updatedCompletedRequests;
      });
    };

    if (completedRequests.length > 0) {
      fetchRecyclerData();
    }
  }, [completedRequests.length]); // Use completedRequests.length as the dependency

  const formatDate = (dateString) => {
    const [date, time] = dateString.split(', ');
    const [day, month, year] = date.split('.');
    const [hours, minutes, seconds] = time.split(':');
    const formattedDate = new Date(
      `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`
    );
    return formattedDate.toLocaleString();
  };

  // Define columns for the data table
  const columns = [
    {
      name: 'Address',
      selector: (row) => row.req_address, // Use a selector function
      sortable: true,
      wrap: true,
    },
    {
      name: 'Bottles Number',
      selector: (row) => row.bottles_number, // Use a selector function
      sortable: true,
      center: true,
    },
    {
      name: 'Recycler Name',
      selector: (row) => row.recyclerFullName, // Use a selector function
      sortable: true,
      center: true,
    },
    {
      name: 'Phone Number',
      selector: (row) => row.recyclerPhone, // Use a selector function
      sortable: true,
      center: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status, // Use a selector function
      sortable: true,
      center: true,
      cell: (row) => {
        switch (row.status) {
          case 1:
            return 'Awaits Recycler';
          case 2:
            return 'Awaits Approval';
          case 3:
            return 'Completed';
          case 4:
            return 'Cancelled';
          case 5:
            return 'Awaits Pickup';
          default:
            return 'Unknown Status';
        }
      },
    },
    {
      name: 'Completed Date',
      selector: (row) => row.completed_date, // Use a selector function
      sortable: true,
      center: true,
      cell: (row) => {
        //console.log(row.completed_date);
        return row.completed_date &&
          row.completed_date !== '0000-00-00 00:00:00'
          ? row.completed_date
          : 'N/A';
      },
    },
  ];
  // Transform completedRequests data to include 'recyclerFullName', 'recyclerPhone', and 'completed_date'
  const data = completedRequests.map((request) => ({
    ...request,
    recyclerFullName:
      request.status === 4
        ? 'Canceled'
        : request.recycler
        ? `${request.recycler.first_name} ${request.recycler.last_name}`
        : 'Awaits Recycler',
    recyclerPhone: request.recycler ? request.recycler.phone : '',
    completed_date: request.completed_date
      ? new Date(request.completed_date).toLocaleString()
      : 'N/A',
  }));

  // Custom styles for the table
  const customStyles = {
    table: {
      style: {
        minWidth: '100%',
      },
    },
    rows: {
      style: {
        textAlign: 'center',
      },
    },
  };

  // Custom cell renderer to allow text wrapping for the "Address" column
  const customCell = (cell) => {
    return (
      <div
        style={{
          whiteSpace: 'normal',
          wordWrap: 'break-word',
          textAlign: 'center',
        }}
      >
        {cell}
      </div>
    );
  };

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4">Completed Requests:</h2>
      {completedRequests.length > 0 ? (
        <div className="mx-auto w-full max-w-6xl text-center">
          <DataTable
            columns={columns}
            data={data}
            striped
            highlightOnHover
            pagination
            customStyles={customStyles}
            customCell={customCell}
            className="border w-full"
          />
        </div>
      ) : (
        <p>No completed requests found</p>
      )}
    </div>
  );
};

export default Completed;