const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routers/employeeRoutes');
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});