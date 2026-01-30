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