export const validateInfo = (inputs, setError) => {
  // Check if all required fields are filled in
  const requiredFields = [
    'first_name',
    'last_name',
    'email',
    'city',
    'address',
    'phone',
  ];
  const missingFields = requiredFields.filter((field) => !inputs[field]);

  if (missingFields.length > 0) {
    setError(
      `Please fill in the following fields: ${missingFields.join(', ')}`
    );
    return false;
  }

  const nameRegex = /^[a-zA-Z\s]+$/; // Allow alphabets and spaces

  // Check first_name and last_name
  if (!nameRegex.test(inputs.first_name) || inputs.first_name.length > 55) {
    setError('Invalid first name');
    return false;
  }
  if (!nameRegex.test(inputs.last_name) || inputs.last_name.length > 55) {
    setError('Invalid last name');
    return false;
  }

  const addressRegex = /^[A-Za-z0-9\s.-]+$/;

  // Check city and address
  if (!addressRegex.test(inputs.city) || inputs.city.length > 50) {
    setError('Invalid city');
    return false;
  }

  // Check address
  if (inputs.address.length > 50) {
    setError('Address cannot exceed 50 characters');
    return false;
  }

  const phoneRegex = /^\d{9,10}$/;

  // Check phone
  if (!phoneRegex.test(inputs.phone)) {
    setError('Invalid phone number');
    return false;
  }

  return true;
};
