import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { fetchUserRequests, fetchRecyclerDetails } from './UserFunctions';
import { getStatusColor, renderButtons } from './RequestUtils';

const RequestStatus = () => {
  const { currentUser } = useContext(AuthContext);
  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = currentUser.ID;
      const data = await fetchUserRequests(userId);
      setUserRequests(data);
    };

    fetchData();
  }, [currentUser]);

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
                  {request.recycler ? (
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
                    {renderButtons(request.status)}
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
