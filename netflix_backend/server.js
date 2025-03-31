const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Use your actual MongoDB connection string here
mongoose.connect("mongodb+srv://new-user69:Suraj2025@cluster0.1ct8eyx.mongodb.net/myDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model("User", UserSchema);

// Testing route to check backend
app.get("/", (req, res) => {
    console.log("Test route was hit!"); // Console log when the test route is accessed
    res.json({ message: "Backend is working!" });
});

// Post route to store user data
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = new User({ email, password });
        await newUser.save();
        res.json({ message: "Data saved successfully!" });
    } catch (err) {
        console.error("Error saving data:", err);
        res.status(500).json({ message: "Server error!" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
