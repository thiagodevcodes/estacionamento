const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController");

//CREATE

router.post("/", async(req,res) => {
  UserController.createUser(req,res);
})

//READ

router.get("/", async(req, res) => {
  UserController.readUsers(req,res);
})

//UPDATE

router.post("/:id", async(req,res) => {
  UserController.updateUser(req,res)
})

//ALTER PERMISSION

router.get("/permissao/:id", async(req, res) => {
  UserController.adminUser(req,res);
})


//DELETE

router.delete("/:id", (req,res) => {
  UserController.deleteUser(req.res);
})

//FINALLY ACESS

router.get("/finalizar/:id", async(req, res) => {
  UserController.finallyUser(req,res)
})



module.exports = router;
