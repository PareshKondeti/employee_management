const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const EmployeeSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4, 
    unique: true,    
  },
  name: {
    type: String,
    required: true,
  },
  phoneno: {
    type: String,
    required: true,
    match: /^\d{10}$/, 
  },
  panCard: {
    type: String,
    required: true, 
    match: /^[A-Z]{4}\d{4}[A-Z]{1}$/, 
  },
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
