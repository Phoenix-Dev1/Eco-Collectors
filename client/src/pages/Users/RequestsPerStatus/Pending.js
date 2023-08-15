import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/authContext';
import DataTable from 'react-data-table-component';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  fetchUserRequests,
  fetchRecyclerDetails,
  acceptRequest,
  declineRequest,
  cancelRequest,
  acceptAndCloseRequest,
} from '../UserFunctions';
import { renderButtons, modalStyle } from '../RequestUtils';

const Pending = () => {
  // State for the React Modal
  const { currentUser } = useContext(AuthContext);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedBottles, setSelectedBottles] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null); // Add this state

  // Open the modal
  const openModal = (request) => {
    setCurrentRequest(request);
    setSelectedBottles(request.bottles_number); // Set selectedBottles
    setModalOpen(true);
  };

  // Close the modal
  const closeModal = () => setModalOpen(false);

  // Modal content
  const modalContent = (
    <Box sx={modalStyle}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        className="text-center"
      >
        Final bottles number
      </Typography>
      <div className="text-center">
        <input
          className="border border-black text-center"
          type="number"
          value={selectedBottles}
          onChange={(e) => setSelectedBottles(e.target.value)}
        />
      </div>
      <div className="text-center">
        <Button
          onClick={() =>
            handleAcceptAndCloseWithBottles(
              currentRequest.request_id,
              selectedBottles
            )
          }
        >
          Accept & Close
        </Button>
        <Button onClick={closeModal}>Cancel</Button>
      </div>
    </Box>
  );

  // Handle the "Accept & Close" action with selected bottles
  const handleAcceptAndCloseWithBottles = async (
    requestId,
    newBottlesNumber
  ) => {
    try {
      const response = await acceptAndCloseRequest(requestId, newBottlesNumber);
      if (response) {
        closeModal(); // Close the modal
        window.location.reload(); // Reload the page
      }
    } catch (error) {
      console.log('Error accepting and closing request:', error);
    }
  };

  // Fetching user request by user id
  useEffect(() => {
    const fetchData = async () => {
      const userId = currentUser.ID;
      const data = await fetchUserRequests(userId);
      setPendingRequests(
        data.filter((request) => request.status !== 3 && request.status !== 4)
      );
    };

    fetchData();
  }, [currentUser]);

  // fetching recycler details based on recycler id in user_request table
  useEffect(() => {
    const fetchRecyclerData = async () => {
      const recyclerIds = pendingRequests.map((request) => request.recycler_id);
      const recyclerDetails = await Promise.all(
        recyclerIds.map((recyclerId) => fetchRecyclerDetails(recyclerId))
      );
      setPendingRequests((prevPendingRequests) => {
        const updatedPendingRequests = prevPendingRequests.map(
          (request, index) => {
            const recyclerDetail = recyclerDetails[index];
            if (recyclerDetail && recyclerDetail.length > 0) {
              request.recycler = recyclerDetail[0];
            }
            return request;
          }
        );
        return updatedPendingRequests;
      });
    };

    if (pendingRequests.length > 0) {
      fetchRecyclerData();
    }
  }, [pendingRequests]); // Use pendingRequests as the dependency

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
              () => openModal(row) // Use openModal instead of handleAcceptAndClose
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

  // Transform pendingRequests data to include 'recyclerFullName' and 'recyclerPhone'
  const data = pendingRequests.map((request) => ({
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
      <h2 className="text-lg font-bold mb-4">Pending Requests:</h2>
      <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalContent}
      </Modal>
      {pendingRequests.length > 0 ? (
        <div className="mx-auto w-full px-4 md:max-w-3xl lg:max-w-4xl xl:max-w-6xl text-center">
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
        <p>No pending requests found</p>
      )}
    </div>
  );
};

export default Pending;
