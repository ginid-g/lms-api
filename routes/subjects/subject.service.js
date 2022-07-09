const DB = require("../../db");
const createError = require("http-errors");

const create = async (name, classId) => {
  if (!name) {
    throw createError(400, "Subject name is required");
  }

  if (!classId) {
    throw createError(400, "Class is required");
  }

  const result = await DB.Subjects.findOne({ name: name, classId: classId });

  if (result) {
    throw createError(400, "Subject already exists for the class");
  }

  const newSubject = new DB.Subjects({
    name: name,
    classId: classId,
  });

  return await newSubject.save();
};

const edit = async (id, name, classId) => {
  if (!id) {
    throw createError(400, "Id is required");
  }

  if (!name) {
    throw createError(400, "Subject name is required");
  }

  if (!classId) {
    throw createError(400, "Class is required");
  }

  const result = await DB.Subjects.findOne({
    name: name,
    classId: classId,
    _id: { $ne: id },
  });

  if (result) {
    throw createError(400, "Subject already exists for the class");
  }

  const editSubject = await DB.Subjects.findOne({ _id: id });

  if (!editSubject) {
    throw createError(400, "Subject not found");
  }

  editSubject.classId = classId;
  editSubject.name = name;

  return editSubject.save();
};

const getAll = async () => {
  return await DB.Subjects.find({}, { _id: 1, name: 1, classId: 1 });
};

const getById = async (id) => {
  if (!id) {
    throw createError(400, "Id is required");
  }

  return await DB.Subjects.findOne(
    { _id: id },
    { _id: 1, name: 1, classId: 1 }
  );
};

const remove = async (id) => {
  if (!id) {
    throw createError(400, "Id is required");
  }

  const result = await DB.Subjects.findOne({ _id: id }, { _id: 1 });

  if (!result) {
    throw createError(400, "Subject not found");
  }

  return await result.remove();
};

module.exports = {
  create,
  edit,
  getAll,
  getById,
  remove,
};
