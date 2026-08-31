const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({

    actor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    role: String,

    action: String,

    details: String,

    timestamp: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("ActivityLog", activityLogSchema);