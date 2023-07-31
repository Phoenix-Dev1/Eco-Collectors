import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import DataTable from 'react-data-table-component';
import {
  fetchUserRequests,
  fetchRecyclerDetails,
  acceptRequest,
  declineRequest,
  cancelRequest,
  acceptAndCloseRequest,
} from './UserFunctions';
import { getStatusColor, renderButtons } from './RequestUtils';

const RequestStatus = () => {
  const { currentUser } = useContext(AuthContext);
  const [userRequests, setUserRequests] = useState([]);

  // Fetching user request by user id
  useEffect(() => {
    const fetchData = async () => {
      const userId = currentUser.ID;
      const data = await fetchUserRequests(userId);
      setUserRequests(data);
    };

    fetchData();
  }, [currentUser]);

  // fetching recycler details based on recycler id in user_request table
  useEffect(() => {
    const fetchRecyclerData = async () => {
      const recyclerIds = userRequests.map((request) => request.recycler_id);
      const recyclerDetails = await Promise.all(
        recyclerIds.map((recyclerId) => fetchRecyclerDetails(recyclerId))
      );
      setUserRequests((prevUserRequests) => {
        const updatedUserRequests = prevUserRequests.map((request, index) => {
          const recyclerDetail = recyclerDetails[index];
          if (recyclerDetail && recyclerDetail.length > 0) {
            request.recycler = recyclerDetail[0];
          }
          return request;
        });
        return updatedUserRequests;
      });
    };

    if (userRequests.length > 0) {
      fetchRecyclerData();
    }
  }, [userRequests.length]); // Use userRequests.length as the dependency

  // Accepting recycler pickup request
  const handleAccept = async (requestId) => {
    try {
      const response = await acceptRequest(requestId);
      if (response) {
        // Reload the page
        window.location.reload();
      }
    } catch (error) {
      console.log('Error accepting request:', error);
    }
  };

  // Declining recycler pickup request
  const handleDecline = async (requestId) => {
    try {
      const response = await declineRequest(requestId);
      if (response) {
        // Reload the page
        window.location.reload();
      }
    } catch (error) {
      console.log('Error declining request:', error);
    }
  };

  // Canceling request by request id
  const handleCancel = async (requestId) => {
    try {
      const response = await cancelRequest(requestId);
      if (response) {
        // Reload the page or update the request status locally
        window.location.reload();
      }
    } catch (error) {
      console.log('Error canceling request:', error);
    }
  };

  // Accept & Close the request
  const handleAcceptAndClose = async (requestId) => {
    try {
      const response = await acceptAndCloseRequest(requestId);
      if (response) {
        window.location.reload(); // Reload the page
      }
    } catch (error) {
      console.log('Error accepting and closing request:', error);
    }
  };

  // Define columns for the data table
  const columns = [
    { name: 'User ID', selector: (row) => row.user_id, sortable: true },
    { name: 'Request ID', selector: (row) => row.request_id, sortable: true },
    { name: 'Address', selector: (row) => row.req_address, sortable: true },
    {
      name: 'Bottles Number',
      selector: (row) => row.bottles_number,
      sortable: true,
    },
    {
      name: 'Recycler Name',
      selector: (row) => row.recyclerFullName,
      sortable: true,
    },
    {
      name: 'Phone Number',
      selector: (row) => row.recyclerPhone,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => {
        return (
          <div className="flex flex-col">
            {renderButtons(
              row.status,
              row.request_id,
              handleAccept,
              handleDecline,
              handleCancel,
              handleAcceptAndClose
            )}
          </div>
        );
      },
    },
    { name: 'Status', selector: (row) => row.status, sortable: true },
  ];

  // Transform userRequests data to include 'recyclerFullName' and 'recyclerPhone'
  const data = userRequests.map((request) => ({
    ...request,
    recyclerFullName:
      request.status === 4
        ? 'Canceled'
        : request.recycler
        ? `${request.recycler.first_name} ${request.recycler.last_name}`
        : 'Awaits Recycler',
    recyclerPhone: request.recycler ? request.recycler.phone : '',
  }));

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4">All Requests:</h2>
      {userRequests.length > 0 ? (
        <div className="mx-auto w-full max-w-6xl text-center">
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

export default RequestStatus;
