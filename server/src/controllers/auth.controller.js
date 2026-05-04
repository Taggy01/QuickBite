import Users from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwttoken.js";

export const signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    email = email?.toLowerCase().trim();
    username = username?.trim();

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const user = await Users.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    generateToken(savedUser._id, res);

    const { password: _, ...userData } = savedUser.toObject();

    return res.status(201).json({
      message: "User Created Successfully",
      data: userData,
    });
  } catch (error) {
    console.log("Error in signup Controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.toLowerCase().trim();

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    generateToken(user._id, res);

    const { password: _, ...userData } = user.toObject();

    return res.status(200).json({
      message: "Login Successfull",
      data: userData,
    });
  } catch (error) {
    console.log("Error in login Controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "Logged out Successfully",
    });
  } catch (error) {
    console.log("Error in signout controller:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};