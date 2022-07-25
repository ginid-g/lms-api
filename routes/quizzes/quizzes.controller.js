const router = require("express").Router();

const QuizService = require("./quizzes.service");

const create = async (req, res, next) => {
  const { classId, subjectId, title, questions } = req.body;

  QuizService.create(classId, subjectId, title, questions)
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

const edit = async (req, res, next) => {
  const { _id, classId, subjectId, title, questions } = req.body;

  QuizService.edit(_id, classId, subjectId, title, questions)
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

const getAll = async (req, res, next) => {
  QuizService.getAll()
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  QuizService.getById(id)
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  QuizService.remove(id)
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/", edit);
router.delete("/:id", remove);

module.exports = router;
