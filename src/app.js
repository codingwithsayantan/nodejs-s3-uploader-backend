require("dotenv").config();
const express = require("express");
const cors = require("cors");

const fileRouter = require("../src/routes/file.router.js");

const PORT = process.env.PORT || 5172;

const app = express();
app.use(cors());
app.use(express.json());

// Add main router to the middleware
app.use("/api", fileRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
});
