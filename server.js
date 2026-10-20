const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();


const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./src/routes/auth.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes MUST come after middleware
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Server is working!");
});

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection failed:", err.message));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
