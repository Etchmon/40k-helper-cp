const express = require("express");
const cors = require("cors");
const pool = require("./src/database/db");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/api/data", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM missions");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Incorrect query || Data does not exisit || Internal Server Error",
    });
  }
});
