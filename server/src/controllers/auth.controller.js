import Users from "../models/user.js";
import bcrypt from 'bcryptjs';
import generateToken from '../utils/jwttoken.js';

export const signup = async(req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    if(password.length < 6){
        return res.status(400).json({
            message: "Password must be more than 6 characters.",
        })
    }

    if(!/\S+@\S+\.\S+/.test(email)){
        return res.status(400).json({
            message : "Invaild Email",
        })
    }

    const user = await Users.findOne({email});

    if(user){
        return res.status(400).json({
            message : "User already exists.",
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    generateToken(savedUser, res);

    res.status(201).json({
        message : "User Created Successfully",
        data : savedUser
    })

  } catch (error) {
    console.log("Error in signup Controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
