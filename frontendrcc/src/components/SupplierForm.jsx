import React, { useState } from 'react';

const SupplierForm = () => {
  // State to store the name
  const [name, setName] = useState('');

  // State to store the array of addresses
  const [addresses, setAddresses] = useState([
    { street: '', city: '', state: '', zipCode: '', country: '' },
  ]);

  // Function to handle changes in the name input
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Function to handle changes in the address input fields
  const handleAddressChange = (index, event) => {
    const { name, value } = event.target;
    const updatedAddresses = [...addresses];
    updatedAddresses[index][name] = value;
    setAddresses(updatedAddresses);
  };

  // Function to add a new address input field
  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      { street: '', city: '', state: '', zipCode: '', country: '' },
    ]);
  };

  // Function to remove an address input field
  const handleRemoveAddress = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Submitted');
    console.log('Name:', name);
    console.log('Addresses:', addresses);
    // Here you can handle the form submission logic, like sending data to an API
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Supplier</h2>

      {/* Name Input */}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>

      {/* Dynamic Address Inputs */}
      {addresses.map((address, index) => (
        <div key={index}>
          <h3>Address {index + 1}</h3>

          <label htmlFor={`street-${index}`}>Street:</label>
          <input
            type="text"
            id={`street-${index}`}
            name="street"
            value={address.street}
            onChange={(event) => handleAddressChange(index, event)}
            required
          />

          <label htmlFor={`city-${index}`}>City:</label>
          <input
            type="text"
            id={`city-${index}`}
            name="city"
            value={address.city}
            onChange={(event) => handleAddressChange(index, event)}
            required
          />

          <label htmlFor={`state-${index}`}>State:</label>
          <input
            type="text"
            id={`state-${index}`}
            name="state"
            value={address.state}
            onChange={(event) => handleAddressChange(index, event)}
            required
          />

          <label htmlFor={`zipCode-${index}`}>Zip Code:</label>
          <input
            type="text"
            id={`zipCode-${index}`}
            name="zipCode"
            value={address.zipCode}
            onChange={(event) => handleAddressChange(index, event)}
            required
          />

          <label htmlFor={`country-${index}`}>Country:</label>
          <input
            type="text"
            id={`country-${index}`}
            name="country"
            value={address.country}
            onChange={(event) => handleAddressChange(index, event)}
            required
          />

          {/* Remove Address Button */}
          {addresses.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveAddress(index)}
            >
              Remove Address
            </button>
          )}
        </div>
      ))}

      {/* Add Address Button */}
      <button type="button" onClick={handleAddAddress}>
        Add Address
      </button>

      {/* Submit Button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default SupplierForm;
