const dns = require("node:dns");
const path = require("node:path");

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
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection failed:", err.message));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
