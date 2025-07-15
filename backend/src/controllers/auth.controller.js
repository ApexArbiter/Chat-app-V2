import bcrypt from "bcryptjs";

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
      return res.status(400).json({ message: "User already exists" });
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
      await newUser.save();
      return res.status(200).json({ message: "User created successfully" });
    }else{
      return res.status(400).json({ message: "User not created" });
    }
  } catch (error) {}
};
export const lgoin = (req, res) => {
  res.send("signup");
};
export const logout = (req, res) => {
  res.send("signup");
};
export const forget = (req, res) => {
  res.send("signup");
};
