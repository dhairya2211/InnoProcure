const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    companyName: {
        type: String,
        required: true
    },

    dpiitNumber: String,

    foundingYear: String,

    headquarters: String,

    shortDescription: String,

    capabilities: [String],

    technologyAreas: [String],

    pastExperience: String,

    teamSize: Number,

    website: String,

    contactEmail: String,

    contactPhone: String

}, { timestamps: true });

module.exports = mongoose.model("Startup", startupSchema);