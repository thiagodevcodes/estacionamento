const express = require('express');
const OrdemContoller = require("../controllers/OrdemController")
var router = express.Router();

//CREATE

router.post("/", async(req, res) => {
  OrdemContoller.createOrdem(req,res);
})

//READ

router.get("/", async(req, res) => {
  OrdemContoller.readOrdens(req,res);  
})

router.get("/:id", async(req, res) => {
  OrdemContoller.readOrdem(req,res);
})

//UPDATE

router.post("/:id", async(req, res) => {
  OrdemContoller.updateOrdem(req,res)
})

router.get("/finalizar/:id", async(req, res) => {
  OrdemContoller.finallyOrdem(req,res);
})

//DELETE

router.delete("/:id", async(req, res) => {
  OrdemContoller.deleteOrdem(req,res);
})



module.exports = router;
