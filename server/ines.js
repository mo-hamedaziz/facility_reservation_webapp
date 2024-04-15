const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // For password hashing

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["clubPresident", "admin"],
  },
});
// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10; // Adjust salt rounds as needed
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;








const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    console.error("Email or password is missing");
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Try to find the user by email
    const user = await User.findOne({ email });

    // If the user doesn't exist, send an error response
    if (!user) {
      return res.status(401).json({ message: "Unexisted User" });
    }

    // Compare the entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is incorrect, send an error response
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create a JWT token with limited user information
    const payload = {
      userId: user._id,
      userType: user.userType,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30m",
    }); // Adjust expiration time as needed

    // Send the token and limited user information
    res.status(200).json({
      token,
      user: { id: user._id, email: user.email, userType: user.userType },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" }); // Generic error for client
  }
};

module.exports = {
  handleUserLogin,
};










const express = require("express");
const router = express.Router();
const { handleUserLogin } = require("../controllers/userLoginController");
const auth = require("../Middleware/auth");

// Login route
router.post("/api/user/login", handleUserLogin);

// Protected routes (examples)
router.get("/api/admin/home", auth, (req, res) => {
  if (req.user.userType === "admin") {
    res.send("Admin Home Page");
  } else {
    res.status(401).json({ message: "Unauthorized access" });
  }
});

router.get("/api/clubpresident/home", auth, (req, res) => {
  // Check if the user is a clubPresident from the JWT token (refer to your auth middleware)
  if (req.user.userType === "clubPresident") {
    res.send("ClubPresident Home Page");
  } else {
    res.status(401).json({ message: "Unauthorized access" });
  }
});

module.exports = router;










auth.js const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No authorization token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
    req.user = await User.findById(decoded.id); // Assuming your user ID is in the token payload
  } catch (error) {
    return res.status(401).json({ message: "Invalid authorization token" });
  }

  // If the user is found and authorized, proceed to the next middleware or route
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized access" });
  }
};



















server.js
require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userLoginRoutes = require("./routes/userLoginRoutes");

const port = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(
  cors({
    // Enable CORS for your frontend app (adjust origin as needed)
    origin: process.env.REACT_APP_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PATCH"],
  })
);
app.use(express.json()); // Parse JSON data from requests
app.use((req, res, next) => {
  // Log request information
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/user", userLoginRoutes); // Apply user login routes

// Connect to DB
console.log("Connecting to the database ...");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(port, () => {
      console.log(`Connected to the Database\nListening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });









