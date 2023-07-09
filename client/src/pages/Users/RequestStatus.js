import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
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

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4">My Requests:</h2>
      {userRequests.length > 0 ? (
        <table className="mx-auto w-full max-w-4xl text-center">
          <thead>
            <tr>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Request ID</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Bottles Number</th>
              <th className="px-4 py-2">Recycler Name</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Actions</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {userRequests.map((request) => (
              <tr
                key={request.request_id}
                className={getStatusColor(request.status)}
              >
                <td className="border px-4 py-2 max-w-xs truncate">
                  {request.user_id}
                </td>
                <td className="border px-4 py-2 max-w-xs truncate">
                  {request.request_id}
                </td>
                <td className="border px-4 py-2 max-w-xs truncate">
                  {request.req_address}
                </td>
                <td className="border px-4 py-2 max-w-xs truncate">
                  {request.bottles_number}
                </td>
                <td className="border px-4 py-2 max-w-xs truncate">
                  {request.status === 4 ? (
                    <span className="text-red-700 font-bold">Canceled</span>
                  ) : request.recycler ? (
                    `${request.recycler.first_name} ${request.recycler.last_name}`
                  ) : (
                    <span className="text-blue-700 font-bold">
                      Awaits Recycler
                    </span>
                  )}
                </td>
                <td className="border px-4 py-2 max-w-xs truncate">
                  {request.recycler && request.recycler.phone}
                </td>
                <td className="border px-4 py-2 max-w-xs truncate">
                  <div className="flex flex-col">
                    {renderButtons(
                      request.status,
                      request.request_id,
                      handleAccept,
                      handleDecline,
                      handleCancel,
                      handleAcceptAndClose
                    )}
                  </div>
                </td>
                <td className="border px-4 py-2 max-w-xs truncate">
                  {request.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No requests found</p>
      )}
    </div>
  );
};

export default RequestStatus;
