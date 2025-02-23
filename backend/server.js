const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Backend Running" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
