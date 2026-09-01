const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const path = require("path");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const connectDB = require("../config/db");
const User = require("../models/User");

async function seedTestUser() {
    try {
        await connectDB();

        const email = "test@example.com";
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log("Test user already exists. No duplicate created.");
            return;
        }

        const passwordHash = await bcrypt.hash("Test1234", 10);

        const user = await User.create({
            name: "Test User",
            email,
            passwordHash,
            role: "startup"
        });

        console.log("Test user created:");
        console.log({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        console.error("Failed to seed test user:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

seedTestUser();
