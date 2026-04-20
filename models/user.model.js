const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        default: "user"
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

module.exports = User;