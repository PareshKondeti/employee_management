import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: "", phoneno: "", panCard: "" });
  const [updateId, setUpdateId] = useState(null);
  const [error, setError] = useState("");
  const API_URL = "https://employee-management-thy6.onrender.com/employees";

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_URL}/allemployees`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const addEmployee = async () => {
    try {
      await axios.post(`${API_URL}/add-emp`, formData);
      setFormData({ name: "", phoneno: "", panCard: "" });
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const updateEmployee = async () => {
    try {
      await axios.put(`${API_URL}/update/${updateId}`, formData);
      setFormData({ name: "", phoneno: "", panCard: "" });
      setUpdateId(null);
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${API_URL}/del/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneno") {
      if (!/^\d*$/.test(value)) {
        setError("Phone number can only contain numbers.");
        return;
      }
      if (value.length > 10) {
        setError("Phone number cannot exceed 10 digits.");
        return;
      }
    }

    if (name === "panCard") {
      //if (!/^[A-Z]{4}[0-9]{4}[A-Z]$/.test(value)) {
        //setError("PAN card must follow the format AAAA1234A.");
        //return;
      //}
    }

    setError("");
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phoneno || !formData.panCard) {
      setError("All fields are required.");
      return;
    }
    if (formData.phoneno.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }
    if (!/^[A-Z]{4}[0-9]{4}[A-Z]$/.test(formData.panCard)) {
      setError("PAN card must follow the format AAAA1234A.");
      return;
    }
    if (updateId) {
      updateEmployee();
    } else {
      addEmployee();
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">Employee Management</h1>
      <form className="employee-form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          className="form-input"
          type="text"
          name="phoneno"
          placeholder="Enter Phone Number"
          value={formData.phoneno}
          onChange={handleInputChange}
          required
        />
        <input
          className="form-input"
          type="text"
          name="panCard"
          placeholder="Enter PAN Card (e.g., ABCD1234E)"
          value={formData.panCard}
          onChange={handleInputChange}
          required
        />
        <button className="form-button" type="submit">
          {updateId ? "Update" : "Add"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <h2 className="list-title">Employees List</h2>
      <ul className="employee-list">
        {employees.map((employee) => (
          <li className="employee-item" key={employee._id}>
            {employee.name} - {employee.phoneno} - {employee.panCard}
            <button
              className="delete-button"
              onClick={() => deleteEmployee(employee._id)}
            >
              Delete
            </button>
            <button
              className="update-button"
              onClick={() => {
                setFormData({
                  name: employee.name,
                  phoneno: employee.phoneno,
                  panCard: employee.panCard,
                });
                setUpdateId(employee._id);
              }}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
