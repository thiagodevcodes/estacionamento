const express = require('express');
const VagasController = require("../controllers/VagasController")
const db = require("../models/db");
var router = express.Router();

//CREATE

router.get("/adicionar", async(req, res) => {
    await VagasController.createVaga()
    res.redirect("/vagas")
})

//READ

router.get("/", async(req, res) => {
  const vagas = await VagasController.readVagas();
  
  const vagasOcup = await VagasController.readVagas(true);
  const vagasLivres = await VagasController.readVagas(false);

  res.render("vagas/index", {
    posts: vagas,
    vagasLivres: vagasLivres,
    vagasOcup: vagasOcup,
    title: 'Vagas'
  })
})

//DELETE

router.get("/remover", async(req, res) => {
    const vagas = await db.sequelize.query("SELECT id FROM vagas")
    await VagasController.deleteVaga(vagas[0].length);
    res.redirect("/vagas")
})

module.exports = router;
