import { User } from "../models/usersSchema.js";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";
export const register = async (req, res) => {
  const { name, email, city, password } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return res.status(400).json({ status: "fail", message: "Email is exist" });
  }
  const passwordHashing = bcryptjs.hashSync(password, 8);
  const user = new User({
    name,
    email,
    city,
    password: passwordHashing,
  });
  const token = await JWT.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.TOKEN_SECRET_KEY,
  );
  user.token = token;
  await user.save();
  res.status(201).json({ status: "success", data: { user } });
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ status: "fail", message: "User Not Found" });
  }
  const matchedPassword = await bcryptjs.compare(password, user.password);
  if (!matchedPassword) {
    return res
      .status(401)
      .json({ status: "fail", message: "Incorrect password" });
  }
  const token = await JWT.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.TOKEN_SECRET_KEY,
  );
  user.token = token;
  await user.save()
  res.json({ status: "success", data: { user } });
};

export const getCurrentUser = async (req, res) => {
    const currentUser = await User.findOne({_id: req.user.id}, {__v: false});
    if(!currentUser) {
        res.status(404).json({status: "fail", message: "User Not Found"})
    }
    res.json({status: "success", data: {user: currentUser}})
}
export const logout = async (req, res) => {
  try {
    const cuurentUser = await User.findById(req.user.id);

    if (!cuurentUser) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    cuurentUser.token = null;
    await cuurentUser.save();

    res.json({ status: "success", message: "Logged out successfully" });

  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};