const { Router } = require("express");
const { UserController } = require("../controllers/user.controller");

const UserRouter = Router();

UserRouter.post("/signup", UserController.userSignup);
UserRouter.post("/login", UserController.userLogin);

module.exports = {
  UserRouter,
};
