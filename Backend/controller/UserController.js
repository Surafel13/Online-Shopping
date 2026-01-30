import User from "../model/User.js"
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }   

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username, 
        email,
        password: hashedPassword
    });

    res.status(201).json({ message: "User registered successfully" ,
        user: { id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role}
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  } 
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }  
     
    res.status(200).json({ message: "Login successful" ,
        user: { id: user._id, username: user.username, email: user.email, role: user.role}
    });

    } catch (error) {   
    res.status(500).json({ message: "Server error", error });
  } 
};


export const getUserProfile = async (req, res) => {
    try {
        const userId = req.body.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};