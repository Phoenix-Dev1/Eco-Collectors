import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/authContext';
import DataTable from 'react-data-table-component';
import {
  fetchUserRequests,
  fetchRecyclerDetails,
  acceptRequest,
  declineRequest,
  cancelRequest,
  acceptAndCloseRequest,
} from '../UserFunctions';
import { getStatusColor, renderButtons } from '../RequestUtils';

const Cancelled = () => {
  const { currentUser } = useContext(AuthContext);
  const [cancelledRequests, setCancelledRequests] = useState([]);

  // Fetching user request by user id
  useEffect(() => {
    const fetchData = async () => {
      const userId = currentUser.ID;
      const data = await fetchUserRequests(userId);
      setCancelledRequests(data.filter((request) => request.status === 4));
    };

    fetchData();
  }, [currentUser]);

  // fetching recycler details based on recycler id in user_request table
  useEffect(() => {
    const fetchRecyclerData = async () => {
      const recyclerIds = cancelledRequests.map(
        (request) => request.recycler_id
      );
      const recyclerDetails = await Promise.all(
        recyclerIds.map((recyclerId) => fetchRecyclerDetails(recyclerId))
      );
      setCancelledRequests((prevCancelledRequests) => {
        const updatedCancelledRequests = prevCancelledRequests.map(
          (request, index) => {
            const recyclerDetail = recyclerDetails[index];
            if (recyclerDetail && recyclerDetail.length > 0) {
              request.recycler = recyclerDetail[0];
            }
            return request;
          }
        );
        return updatedCancelledRequests;
      });
    };

    if (cancelledRequests.length > 0) {
      fetchRecyclerData();
    }
  }, [cancelledRequests.length]); // Use cancelledRequests.length as the dependency

  // Accepting recycler pickup request
  const handleAccept = async (requestId) => {
    // Implementation for accepting request
  };

  // Declining recycler pickup request
  const handleDecline = async (requestId) => {
    // Implementation for declining request
  };

  // Canceling request by request id
  const handleCancel = async (requestId) => {
    // Implementation for canceling request
  };

  // Accept & Close the request
  const handleAcceptAndClose = async (requestId) => {
    // Implementation for accepting and closing request
  };

  // Define columns for the data table
  const columns = [
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
      center: true,
    },
    {
      name: 'Recycler Name',
      selector: (row) => row.recyclerFullName,
      sortable: true,
      center: true,
    },
    {
      name: 'Phone Number',
      selector: (row) => row.recyclerPhone,
      sortable: true,
      center: true,
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
      center: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
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
  ];

  // Transform cancelledRequests data to include 'recyclerFullName' and 'recyclerPhone'
  const data = cancelledRequests.map((request) => ({
    ...request,
    recyclerFullName:
      request.status === 4
        ? 'Canceled'
        : request.recycler
        ? `${request.recycler.first_name} ${request.recycler.last_name}`
        : 'Awaits Recycler',
    recyclerPhone: request.recycler ? request.recycler.phone : '',
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
      <h2 className="text-lg font-bold mb-4">Cancelled Requests:</h2>
      {cancelledRequests.length > 0 ? (
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
        <p>No cancelled requests found</p>
      )}
    </div>
  );
};

export default Cancelled;