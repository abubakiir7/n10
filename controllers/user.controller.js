const { errorHandler } = require("../helpers/error_hendler");
const user = require("../schemas/user");
const mongoose = require("mongoose");

const addUser = async (req, res) => {
  const { user_name, user_email, password, age, gender, isMarried, wife, phone, salary } = req.body;

  try {
    // const oldUser = await user.findOne({ user_email });
    // if (oldUser) {
    //   return res.status(400).send({ message: "Bunday foydalanuvchui mavjud" });
    // }
    const newUser = await user({
      user_name,
      user_email,
      password,
      age,
      gender,
      isMarried,
      wife,
      phone,
      salary
    });

    await newUser.save();

    res.status(201).send({ message: "Foydalanuchi qo'shildi", newUser });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await user.find({});
    res.status(200).send({ users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik" });
  }
};

const getUserById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const user1 = await user.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: "Bunday user mavjud" });
    }
    res.status(200).send({ user1 });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUserByName = async (req, res) => {
  try {
    // const user1 = await user.findByName(req.params.name);
    const user1 = await user.findOne().byName(req.params.name);
    if (!user) {
      return res.status(400).send({ message: "Bunday user mavjud" });
    }
    res.status(200).send({ user1 });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const user1 = await user.deleteOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: "Bunday user mavjud" });
    }
    res.status(200).send({ user1 });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateUserById = async (req, res) => {
  const { user_name, user_email, password } = req.body;
  if (!user_name || !user_email || !password) {
    return res.status(400).json({ message: "To'liq kiriting" });
  }
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }

    const user1 = await user.updateOne(
      { _id: req.params.id },
      { user_name, user_email, password }
    );
    res.status(200).send({ user1 });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  getUserByName
};
