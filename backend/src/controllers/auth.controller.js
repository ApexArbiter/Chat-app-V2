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
    const user = await UserModal.find({ email });
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
      generateToken()
      await newUser.save();
      return res.status(200).json({ message: "User created successfully" });
    }else{
      return res.status(400).json({ message: "User not created" });
    }
  } catch (error) {}
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
  generateToken()
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
