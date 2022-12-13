const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController");
const User = require("../models/Users")

//CREATE

router.post("/", async(req,res) => {
  let login = req.body.login;
  let user = await User.findOne({
    where: {
      login: login,
      ativo: true
    }
  });

  if(user) {
    res.redirect("/users")
  } else {
    await UserController.createUser(req,res);
  }
})

//READ

router.get("/", async(req, res) => {
  await UserController.readUsers(req,res);
})

//UPDATE

router.post("/:id", async(req,res) => {
  await UserController.updateUser(req,res)
})

//ALTER PERMISSION

router.get("/permissao/:id", async(req, res) => {
  await UserController.adminUser(req,res);
})


//DELETE

router.delete("/:id", async(req,res) => {
  await UserController.deleteUser(req.res);
})

//FINALLY ACESS

router.get("/finalizar/:id", async(req, res) => {
  UserController.finallyUser(req,res)
})



module.exports = router;
