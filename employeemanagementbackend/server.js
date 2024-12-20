const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const employeeRoutes = require("./routes/employeeRoutes");
const cors = require("cors");

const app = express();
const PORT = 5005;

dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGOURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit if the connection fails
  });

// Routes
app.use("/employees", employeeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

 