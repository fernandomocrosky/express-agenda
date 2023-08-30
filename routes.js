const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contatoController = require("./src/controllers/contatoController");
const { loginRequired } = require("./src/middlewares/middleware");

// Rotas da home
route.get("/", homeController.index);

//Rotas de login
route.route("/login/index").get(loginController.index);

route.route("/login/register").post(loginController.register);
route.route("/login/login").post(loginController.login);
route.route("/login/logout").get(loginController.logout);

route.route("/contato/index").get(loginRequired, contatoController.index);

route.route("/contato/index/:id").get(contatoController.editIndex);
route.route("/contato/edit/:id").post(contatoController.edit);
route.route("/contato/delete/:id").get(contatoController.delete);

route.route("/contato/register").post(contatoController.register);

module.exports = route;
