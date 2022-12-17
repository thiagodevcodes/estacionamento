const express = require('express');
const ClienteContoller = require("../controllers/ClienteController")
const MensalistaContoller = require("../controllers/MensalController");
const db = require("../models/db")
const VagasController = require("../controllers/VagasController");
var router = express.Router();


//POST

router.post("/", async(req, res) => {
  const cliente = await ClienteContoller.createCliente({
    nome: req.body.nome,
    tipoCliente: 'Mensalista',
  });

  const vaga = await VagasController.readVaga(req.body.vagas)

  await VagasController.updateVagas(req,res);

  await MensalistaContoller.createMensalista(req, cliente, vaga);
  res.redirect("/mensalistas")
})


//FINNALY

router.get("/finalizar/:id", async(req, res) => {
  await MensalistaContoller.finallyMensalista(req.params.id).then(() => {
    res.redirect("/mensalistas")
  }).catch( () => {
    res.send("not found")
  })
  
})

//READ

router.get("/", async(req, res) => {
  const mensalista = await db.sequelize.query("SELECT mensalistas.id, clientes.nome, mensalistas.cpf, mensalistas.telefone, mensalistas.email, mensalistas.diaVencimento, mensalistas.dataAdmissao, mensalistas.dataRecisao, mensalistas.idCliente FROM mensalistas, clientes WHERE clientes.id = mensalistas.idCliente")
  const vagas = await VagasController.readVagasLivres();
  res.render("mensalistas/index", {
    posts: mensalista[0],
    vagas: vagas
  })
})

router.get("/:id", async(req, res) => {
  const mensalista = await MensalistaContoller.readMensalista(req.params.id);
  const cliente = await ClienteContoller.readCliente(mensalista.idCliente);

  res.render("mensalistas/update", {
    cliente: cliente,
    mensalista: mensalista
  })
})

//UPDATE

router.post("/:id", async(req, res) => {
  let mensalista = await MensalistaContoller.readMensalista(req.params.id);
  await MensalistaContoller.updateMensalista(req, mensalista);
  
  res.redirect("/mensalistas")
})

module.exports = router;
