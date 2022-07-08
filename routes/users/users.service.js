const DB = require("../../db");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const authenticate = async (email, password) => {
  if (!email) {
    throw createError(400, "Email is required");
  }

  if (!password) {
    throw createError(400, "Password is required");
  }

  let user = await DB.Users.findOne({ email: email });

  if (!user) {
    throw createError(401, "Incorrect email or password");
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw createError(401, "Incorrect email or password");
  }

  const token = jwt.sign({ userId: user._id }, "shhhhh23132");

  user = JSON.parse(JSON.stringify(user));

  delete user.password;

  return {
    token: token,
    user,
  };
};

const register = async (firstName, lastName = null, email, password) => {
  if (!firstName) {
    throw createError(400, "FirstName is required");
  }

  if (!email) {
    throw createError(400, "Email is required");
  }
  if (!password) {
    throw createError(400, "Password is required");
  }

  if (await findUser({ email: email })) {
    throw createError(400, "User with this email already exists.");
  }

  const newUser = new DB.Users({
    firstName,
    lastName,
    email,
    role: "student",
  });

  newUser.password = bcrypt.hashSync(password, 8);

  return await newUser.save();
};

const getAllUsers = async (pageNumber = 1, pageSize = 10) => {
  let skip = 0;
  if (pageNumber > 1) {
    skip = (pageNumber - 1) * pageSize;
  }

  const count = await DB.Users.count();
  const users = await DB.Users.find().skip(skip).limit(pageSize);
  return { count, users };
};

const getUserById = async (id) => {
  return await findUser({ id: id });
};

const createUser = async (user) => {
  if (!user) throw "Users details are missing.";

  if (!user.firstName) throw "First Name is required";

  if (!user.email) throw "Emails is required";

  if (!user.password) throw "Password is required";

  if (await findUser({ email: user.email })) throw "Email already exists.";

  const newUser = new DB.Users();

  newUser.firstName = user.firstName;
  newUser.lastName = user.lastName;
  newUser.email = user.email;
  newUser.role = user.role;
  newUser.classId = user.classId;
  newUser.parentId = user.parentId;
  newUser.verfied = user.verfied;

  bcrypt.hash(user.password, 8, async (err, hash) => {
    if (err) throw "Something went wrong";

    newUser.password = hash;

    return await newUser.save();
  });
};

const editUser = async (user = {}) => {
  if (!user.id) {
    throw createError(400, "User id is required");
  }

  const editUser = await findUser({ _id: user.id });

  editUser.firstName = user.firstName;
  editUser.lastName = user.lastName;
  editUser.role = user.role;
  editUser.classId = user.classId;
  editUser.parentId = user.parentId;
  edituser.verfied = user.verfied;

  return await editUses.save();
};

const deleteUser = async (id) => {
  if (!id) throw "Id is required";

  const user = await findUser({ _id: id });

  if (!user) throw createError(400, "User not found.");

  return await user.remove();
};

const findUser = async (obj) => {
  return await DB.Users.findOne(obj, {
    _id: 1,
    email: 1,
    firstName: 1,
    lastName: 1,
    role: 1,
    email: 1,
    classId: 1,
    parentId: 1,
    verfied: 1,
  });
};

module.exports = {
  authenticate,
  register,
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
};
