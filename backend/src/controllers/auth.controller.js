import bcrypt from "bcryptjs";
import { generateToken } from "../utils/index.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const user = await UserModal.findOne({ email });
    if (user) {
      return res.status(400).json({ message: user });
    }

    // hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModal({
      username,
      email,
      password: hashedPassword,
    });

    if(newUser){
      generateToken(newUser._id,res)
      await newUser.save();

      return res.status(201).json({
        _Id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "User not created" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const login = async(req, res) => {
 try {
  const {email,password}=req.body
  const user = await UserModal.findOne({email})
  if(!user){
    res.status(400).json({message:"user not found"})
  }
  const isMatch=bcrypt.compare(password,user.password)
  if(!isMatch){
     res.status(400).json({message:"wrong password"})
  }
  generateToken(user._id,res)
  res.json({message:"user logoin"})
 } catch (error) {
  
 }

};
export const logout = (req, res) => {
  res.send("signup");
};
export const forget = (req, res) => {
  res.send("signup");
};
