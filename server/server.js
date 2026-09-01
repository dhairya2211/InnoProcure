const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/challenges", require("./routes/challengeRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/pilots", require("./routes/pilotRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/startups", require("./routes/startupRoutes"));
app.get("/", (req, res) => {
    res.json({
        message: "InnoProcure Backend is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});