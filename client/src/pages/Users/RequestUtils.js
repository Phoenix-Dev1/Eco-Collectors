// set row color per status
export function getStatusColor(status) {
  switch (status) {
    case 1:
      return 'bg-yellow-300'; // awaits recycler
    case 2:
      return 'bg-purple-300'; // awaits user approvel
    case 3:
      return 'bg-green-300'; // Completed
    case 4:
      return 'bg-red-300'; // canceled
    case 5:
      return 'bg-blue-300'; // awaits recycler pickup
    default:
      return '';
  }
}

// Buttons rendering
export function renderButtons(status) {
  switch (status) {
    case 1:
      return (
        <>
          <button className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update
          </button>
          <button className="mb-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Cancel Request
          </button>
        </>
      );
    case 2:
      return (
        <>
          <button className="mb-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Accept
          </button>
          <button className="mb-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Decline
          </button>
        </>
      );
    case 3:
      return (
        <>
          <p className="mb-2 text-black font-bold">Completed</p>
        </>
      );
    case 4:
      return (
        <>
          <p className="mb-2 text-black font-bold">Canceled</p>
        </>
      );
    case 5:
      return (
        <>
          <>
            <button className="mb-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Accept & Close
            </button>
            <button className="mb-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Cancel Pickup
            </button>
          </>{' '}
        </>
      );
    default:
      return null;
  }
}
