const DB = require("../../db");

const createError = require("http-errors");

const { ObjectId } = require("mongoose").Types;

const create = async (classId, subjectId, title, questions) => {
  if (!classId) {
    throw createError(400, "Class Id is required");
  }

  if (!subjectId) {
    throw createError(400, "Subject Id is required");
  }

  if (!title || !title.length) {
    throw createError(400, "Title is required");
  }

  if (!questions || !questions.length) {
    throw createError(400, "Quiz questions are required");
  }

  if (!Array.isArray(questions)) {
    throw createError(400, "Invalid quiz questions");
  }

  const quiz = new DB.Quizzes({
    classId: classId,
    subjectId: subjectId,
    title: title,
    questions: questions,
  });

  return await quiz.save();
};

const edit = async (id, classId, subjectId, title, questions) => {
  if (!id) {
    throw createError(400, "Id is required");
  }

  if (!classId) {
    throw createError(400, "Class Id is required");
  }

  if (!subjectId) {
    throw createError(400, "Subject Id is required");
  }

  if (!title || !title.length) {
    throw createError(400, "Title is required");
  }

  if (!questions || !questions.length) {
    throw createError(400, "Quiz questions are required");
  }

  if (!Array.isArray(questions)) {
    throw createError(400, "Invalid quiz questions");
  }

  const quiz = await DB.Quizzes.findOne({ _id: id });

  if (!quiz) {
    throw createError(400, "Quiz not found");
  }

  quiz.classId = classId;
  quiz.subjectId = subjectId;
  quiz.title = title;
  quiz.questions = questions;

  return await quiz.save();
};

const getAll = async () => {
  return DB.Quizzes.aggregate([
    {
      $lookup: {
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "class",
      },
    },
    {
      $unwind: {
        path: "$class",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $lookup: {
        from: "subjects",
        localField: "subjectId",
        foreignField: "_id",
        as: "subject",
      },
    },
    {
      $unwind: {
        path: "$subject",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        "class.name": 1,
        "subject.name": 1,
      },
    },
  ]);
};

const getById = async (id) => {
  return DB.Quizzes.findOne({ _id: ObjectId(id) });
};

const remove = async (id) => {
  const quiz = await DB.Quizzes.findOne({ _id: id });

  if (!quiz) {
    throw createError(400, "Quiz not found");
  }

  return await quiz.remove();
};

module.exports = {
  create,
  edit,
  getAll,
  getById,
  remove,
};
