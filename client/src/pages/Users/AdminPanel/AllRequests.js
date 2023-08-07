import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { fetchAllRequests, updateRequestStatus } from './AdminFunctions';
// updateRequestStatus, // Implement this function to update request status
import { format } from 'date-fns';

const AllRequests = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(null); // Initialize as null to show all requests

  const filterByStatus = (status) => {
    setSelectedStatusFilter(status);
  };

  const clearStatusFilter = () => {
    setSelectedStatusFilter(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllRequests(selectedStatusFilter);
      setAllRequests(data);
    };

    fetchData();
  }, [selectedStatusFilter]);

  const handleHoldRequest = async (requestId) => {
    const confirmation = window.confirm(
      'Are you sure you want to Hold/Cancel this request?'
    );
    if (!confirmation) {
      return;
    }

    try {
      // Make an API call to update the request status to 'Hold/Cancel' (status 4)
      await updateRequestStatus(requestId, 4);

      // Fetch updated data based on the current status filter
      const updatedData = await fetchAllRequests(selectedStatusFilter);

      // Update the state with the updated data
      setAllRequests(updatedData);
    } catch (error) {
      console.error('Error holding request:', error);
    }
  };

  const columns = [
    { name: 'User ID', selector: (row) => row.user_id, sortable: true },
    { name: 'Request ID', selector: (row) => row.request_id, sortable: true },
    {
      name: 'Collector Name',
      selector: (row) => row.full_name,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Request Date',
      selector: (row) =>
        format(new Date(row.request_date), 'dd/MM/yyyy - HH:MM'), // Format the date
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Address',
      selector: (row) => row.req_address,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Bottles Number',
      selector: (row) => row.bottles_number,
      sortable: true,
    },

    { name: 'Status', selector: (row) => row.status, sortable: true },
    // Actions column
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex flex-col">
          {row.status === 1 || row.status === 2 || row.status === 5 ? (
            <button
              onClick={() => handleHoldRequest(row.request_id)}
              className="px-2 py-1 rounded bg-yellow-500 text-white mx-2"
            >
              Hold/Cancel
            </button>
          ) : null}
        </div>
      ),
    },
  ];

  // Transform data as needed
  const data = allRequests.map((request) => ({
    ...request,
    // Add transformations or additional fields here
  }));
  //console.table(data);

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4">All Requests:</h2>
      <div className="mb-3">
        <button
          onClick={() => filterByStatus(1)}
          className="px-2 py-1 rounded bg-blue-500 text-white mx-2"
        >
          Awaits Recycler
        </button>
        <button
          onClick={() => filterByStatus(2)}
          className="px-2 py-1 rounded bg-red-500 text-white mx-2"
        >
          Awaits User Approval
        </button>
        <button
          onClick={() => filterByStatus(3)}
          className="px-2 py-1 rounded bg-green-500 text-white mx-2"
        >
          Completed
        </button>
        <button
          onClick={() => filterByStatus(4)}
          className="px-2 py-1 rounded bg-gray-500 text-white mx-2"
        >
          Canceled
        </button>
        <button
          onClick={() => filterByStatus(5)}
          className="px-2 py-1 rounded bg-orange-500 text-white mx-2"
        >
          Awaits Recycler Pickup
        </button>
        <button
          onClick={clearStatusFilter}
          className="px-2 py-1 rounded bg-gray-500 text-white mx-2"
        >
          Clear Filter
        </button>
      </div>
      {allRequests.length > 0 ? (
        <div className="mx-auto w-full px-4 md:max-w-3xl lg:max-w-4xl xl:max-w-6xl text-center">
          <DataTable
            columns={columns}
            data={data}
            striped
            highlightOnHover
            pagination
            className="border w-full"
          />
        </div>
      ) : (
        <p>No requests found</p>
      )}
    </div>
  );
};

export default AllRequests;
