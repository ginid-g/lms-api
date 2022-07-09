const router = require("express").Router();

const SubjectService = require("./subject.service");

const create = (req, res, next) => {
  const { name, classId } = req.body;

  SubjectService.create(name, classId)
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

const edit = (req, res, next) => {
  const { id, name, classId } = req.body;

  SubjectService.edit(id, name, classId)
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

const getAll = (req, res, next) => {
  SubjectService.getAll()
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

const getById = (req, res, next) => {
  const { id } = req.params;

  SubjectService.getById(id)
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

const remove = (req, res, next) => {
  const { id } = req.params;

  SubjectService.remove(id)
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

router.post("/", create);
router.put("/", edit);
router.get("/", getAll);
router.get("/:id", getById);
router.delete("/:id", remove);

module.exports = router;
