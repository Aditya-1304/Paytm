const express = require("express");
require('dotenv').config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json())

const mainRouter = require("./routes/index");
app.use("/api/v1",mainRouter);

// app.use("/api/v2", v2Router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

