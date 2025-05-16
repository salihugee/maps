const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Test the database connection
pool.connect((err) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err.message);
  } else {
    console.log("Connected to PostgreSQL database");
  }
});

// API endpoint to fetch companies
app.get("/api/companies", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM companies");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// API endpoint to fetch irrigation schemes
app.get("/api/irrigation-schemes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM irrig_scheme");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Backend Running" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
