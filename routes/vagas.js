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
  const vagasOcup = await VagasController.readVagasOcupadas();
  const vagasLivres = await VagasController.readVagasLivres();
  res.render("vagas/index", {
    posts: vagas,
    vagasLivres: vagasLivres,
    vagasOcup: vagasOcup
  })
})

//UPDATE

//DELETE

router.get("/remover", async(req, res) => {
    const vagas = await db.sequelize.query("SELECT id FROM vagas")
    await VagasController.deleteVaga(vagas[0].length);
    res.redirect("/vagas")
})

module.exports = router;
