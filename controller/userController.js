import bcrypt from "bcryptjs";
import User from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ msg: "User Data Not Found" });
    }

    const { email, mobileNo, password } = req.body;

    // Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(mobileNo)) {
      return res.status(400).json({ msg: "Invalid phone number format" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new User({
      ...req.body,
      password: hashedPassword,
    });

    const savedData = await userData.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAll = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(404).json({ msg: "User Data Not Found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    const updateData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "User Delete Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
