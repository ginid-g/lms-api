const router = require("express").Router();

const ClassService = require("./classes.service");

const getAll = async (req, res, next) => {
  ClassService.getAll()
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  ClassService.getById(id)
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

const edit = async (req, res, next) => {
  const { id, name } = req.body;

  ClassService.edit(id, name)
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

const create = async (req, res, next) => {
  const { name } = req.body;

  ClassService.create(name)
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  ClassService.remove(id)
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

router.get("/all", getAll);
router.get("/:id", getById);
router.put("/", edit);
router.post("/", create);
router.delete("/:id", remove);

module.exports = router;
