const router = require("express").Router();

const UserService = require("./users.service");

const authenticate = (req, res, next) => {
  const { email, password } = req.body;

  UserService.authenticate(email, password)
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

const register = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  UserService.register(firstName, lastName, email, password)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch(next);
};

const getAllUsers = (req, res, next) => {
  const { pageNumber, pageSize } = req.query;

  UserService.getAllUsers(pageNumber, pageSize)
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { id } = req.params;

  UserService.getUserById(id)
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

const createUser = (req, res, next) => {
   UserService.createUser(req.body.user)
     .then((result) => res.status(200).json({ data: result }))
     .catch(next);
};

const editUser = (req, res, next) => {
  UserService.editUser(req.body.user)
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

const deleteUser = (req, res, next) => {
  const { id } = req.params;

  UserService.deleteUser(id)
    .then((result) => res.status(200).json({ data: result }))
    .catch(next);
};

/**
 * User Routes
 */
router.post("/login", authenticate);
router.post("/register", register);

// Secured routes
router.get("/all", getAllUsers);
router.get("/:id", getUserById);
router.post("/create", createUser);
router.post("/edit", editUser);
router.delete("/:id", deleteUser);

module.exports = router;
