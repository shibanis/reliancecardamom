import React, { useState } from 'react';

const SupplierTable = () => {
  // Initial state with some supplier data
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: 'Supplier One',
      street: '123 Supplier St',
      city: 'Supplier City',
      state: 'Supplier State',
      zipCode: '12345',
      country: 'Supplier Country',
    },
    {
      id: 2,
      name: 'Supplier Two',
      street: '456 Supplier Ave',
      city: 'Another City',
      state: 'Another State',
      zipCode: '67890',
      country: 'Another Country',
    },
  ]);

  // State to manage editing
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null);

  // Function to handle editing a supplier
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditingSupplier({ ...suppliers[index] }); // Clone the supplier data for editing
  };

  // Function to handle changes in the editing supplier input fields
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditingSupplier({ ...editingSupplier, [name]: value });
  };

  // Function to save the edited supplier
  const handleSaveClick = () => {
    const updatedSuppliers = [...suppliers];
    updatedSuppliers[editingIndex] = editingSupplier;
    setSuppliers(updatedSuppliers);
    setEditingIndex(null);
    setEditingSupplier(null);
  };

  // Function to cancel editing
  const handleCancelClick = () => {
    setEditingIndex(null);
    setEditingSupplier(null);
  };

  // Function to handle deleting a supplier
  const handleDeleteClick = (index) => {
    const updatedSuppliers = suppliers.filter((_, i) => i !== index);
    setSuppliers(updatedSuppliers);
  };

  return (
    <div>
      <h2>Supplier Table</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <tr key={supplier.id}>
              {editingIndex === index ? (
                <>
                  {/* Editable inputs for editing supplier */}
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editingSupplier.name}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="street"
                      value={editingSupplier.street}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="city"
                      value={editingSupplier.city}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="state"
                      value={editingSupplier.state}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="zipCode"
                      value={editingSupplier.zipCode}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="country"
                      value={editingSupplier.country}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  {/* Display supplier data */}
                  <td>{supplier.name}</td>
                  <td>{supplier.street}</td>
                  <td>{supplier.city}</td>
                  <td>{supplier.state}</td>
                  <td>{supplier.zipCode}</td>
                  <td>{supplier.country}</td>
                  <td>
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                    <button onClick={() => handleDeleteClick(index)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierTable;
