const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const connectDB = require("../config/db");
const User = require("../models/User");
const Startup = require("../models/Startup");

async function seedTestStartup() {
    try {
        await connectDB();

        const user = await User.findOne({ email: "test@example.com" });

        if (!user) {
            console.error("Test user not found. Run seedTestUser.js first.");
            process.exitCode = 1;
            return;
        }

        const existingStartup = await Startup.findOne({ userId: user._id });

        if (existingStartup) {
            console.log("Startup already exists for this user. No duplicate created.");
            console.log("Startup _id:", existingStartup._id.toString());
            return;
        }

        const startup = await Startup.create({
            userId: user._id,
            companyName: "Test Innovation Labs",
            dpiitNumber: "DPIIT-TEST-001",
            foundingYear: "2022",
            headquarters: "Vadodara, Gujarat",
            shortDescription: "A test startup for InnoProcure API development.",
            capabilities: ["IoT Telemetry", "AI", "Data Analytics"],
            technologyAreas: ["IoT", "AI"],
            pastExperience: "Previous experience developing government technology solutions.",
            teamSize: 10,
            website: "https://example.com",
            contactEmail: "test@example.com",
            contactPhone: "9999999999"
        });

        console.log("Test startup created.");
        console.log("Startup _id:", startup._id.toString());
    } catch (error) {
        console.error("Failed to seed test startup:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

seedTestStartup();
