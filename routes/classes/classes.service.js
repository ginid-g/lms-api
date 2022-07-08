const DB = require("../../db");

const createError = require("http-errors");

const getAll = async () => {
  return await DB.Classes.find({}, { _id: 1, name: 1 });
};

const getById = async (id) => {
  if (!id) {
    throw createError(400, "Id is required");
  }

  return await DB.Classes.findOne({ _id: id }, { _id: 1, name: 1 });
};

const remove = async (id) => {
  if (!id) {
    throw createError(400, "Id is required");
  }

  const result = await DB.Classes.findOne({ _id: id }, { _id: 1, name: 1 });

  if (!result) {
    throw createError(400, "Class not found");
  }

  return await result.remove();
};

const create = async (name) => {
  if (!name) {
    throw createError(400, "Name is required");
  }

  const result = await DB.Classes.findOne({ name: name }, { name: 1 });

  if (result) {
    throw createError(400, "Class with this name is already exists");
  }

  const newClass = new DB.Classes({ name: name });

  return await newClass.save();
};

const edit = async (id, name) => {
  if (!id) {
    throw createError(400, "Id is required");
  }
  if (!name) {
    throw createError(400, "Name is required");
  }

  const result = await DB.Classes.findOne(
    { name: name, _id: { $ne: id } },
    { _id: 1 }
  );

  if (result) {
    throw createError(400, "Class with this name is already exists");
  }

  const editClass = await DB.Classes.findOne({ _id: id });

  if (!editClass) {
    throw createError(400, "Class not found");
  }

  editClass.name = name;

  return await editClass.save();
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  remove,
};
