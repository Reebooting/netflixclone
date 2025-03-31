const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection with Error Handling
mongoose.connect("mongodb+srv://new-user69:Suraj2025@cluster0.1ct8eyx.mongodb.net/myDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit process if MongoDB connection fails
});

// Global Error Handlers for Unhandled Errors
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});

// User Schema
const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});
const User = mongoose.model("User", UserSchema);

// ✅ GET Test Route to Check Backend
app.get("/", (req, res) => {
    console.log("✅ Test route was hit!");
    res.json({ message: "Backend is working!" });
});

// ✅ POST Route to Store Password in MongoDB
app.post("/", async (req, res) => {
    try {
        console.log("Incoming Data:", req.body);
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ success: false, message: "Password is required!" });
        }

        const newUser = new User({ password }); // Saving only the password
        await newUser.save();
        
        res.json({ success: true, message: "Password stored successfully!" });
    } catch (err) {
        console.error("Error storing password:", err);
        res.status(500).json({ success: false, message: "Server error!" });
    }
});

// ✅ POST Route to Store User Data (Login)
app.post("/login", async (req, res) => {
    try {
        console.log("Incoming Data:", req.body);  // <-- Log received JSON data
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "❌ Email and Password are required!" });
        }

        const newUser = new User({ email, password });
        await newUser.save();

        res.json({ message: "✅ Data saved successfully!" });
    } catch (err) {
        console.error("❌ Error saving data:", err);
        res.status(500).json({ message: "❌ Server error!" });
    }
});

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
