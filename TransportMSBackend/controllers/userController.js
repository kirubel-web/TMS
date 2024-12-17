const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 // Import

exports.createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashedPassword,
      role: role || "customer",
    });

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    // If the user role is "customer", create a corresponding customer entry
    if (user.role === "customer") {
      const customer = new Customer({
        name: email, // Assuming name is the email for simplicity
        email: email,
        phone: "", // Default value, can be updated later
        address: "", // Default value, can be updated later
        rating: 0, // Default value, can be updated later
      });
      await customer.save();
    }

    res.status(201).json({
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Other functions...
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, ...updateData } = req.body;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    console.log(token);

    res.status(200).json({
      message: "Login successful",
      user: userResponse,
      token: token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Change from req.user.id to req.user.userId
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Change from req.user.id to req.user.userId
    const { password, ...updateData } = req.body;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
