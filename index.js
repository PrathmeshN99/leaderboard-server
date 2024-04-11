const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas", err));

const Message = mongoose.model("Message", {
  _id: String,
  user: String,
  name: String,
  starsReceived: Number,
  starsLeft: Number,
  text: String,
  hashtags: Object,
  channels: [String],
});

// API endpoint to fetch data
app.get("/api/data", async (req, res) => {
  try {
    const data = await Message.find({}).sort({ starsReceived: -1 }).limit(10);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB Atlas:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
