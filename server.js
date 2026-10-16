require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection failed:", err.message));

app.get('/', function(req, res){
  console.log("hello")
})
const authRoutes = require("./src/routes/auth.routes");

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});