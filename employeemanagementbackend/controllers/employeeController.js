const Employee = require("../models/Employee");

const createEmployee = async (req, res) => {
  try {
    const { name, phoneno, panCard } = req.body;
    if (!name || !phoneno || !panCard) {
      return res.status(400).json({ message: "Name, Phone Number, and PAN Card are required." });
    }
    const employee = new Employee({
      name,
      phoneno,
      panCard,
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

const singleEmployee = async (req, res) => {
  try {
    const singleemployee = await Employee.findById(req.params.id);
    if (!singleemployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(singleemployee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { name, phoneno, panCard } = req.body;
    if (!name || !phoneno || !panCard) {
      return res.status(400).json({ message: "Name, Phone Number, and PAN Card are required." });
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, phoneno, panCard },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

const delEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  singleEmployee,
  updateEmployee,
  delEmployee,
};
