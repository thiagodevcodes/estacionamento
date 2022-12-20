const express = require('express');
const ClienteController = require("../controllers/ClienteController")
const MensalistaController = require("../controllers/MensalController");
const db = require("../models/db")
const VagasController = require("../controllers/VagasController");
var router = express.Router();


//CREATE

router.post("/", async(req, res) => {
  const cliente = await ClienteController.createCliente({
    nome: req.body.nome,
    tipoCliente: 'Mensalista',
  });

  const vaga = await VagasController.readVaga(req.body.vagas);

  await VagasController.updateVagas({
    situacao: true
  }, req.body.vagas);

  await MensalistaController.createMensalista(req, cliente, vaga);
  res.redirect("/mensalistas")
})

//READ

router.get("/", async(req, res) => {
  const mensalista = await db.sequelize.query("SELECT mensalistas.id, clientes.nome, mensalistas.cpf, mensalistas.telefone, mensalistas.email, mensalistas.diaVencimento, mensalistas.dataAdmissao, mensalistas.dataRecisao, mensalistas.idCliente, mensalistas.idVaga FROM mensalistas, clientes WHERE clientes.id = mensalistas.idCliente")
  const vagas = await VagasController.readVagasLivres();
  res.render("mensalistas/index", {
    posts: mensalista[0],
    vagas: vagas
  })
})

router.get("/:id", async(req, res) => {
  const mensalista = await MensalistaController.readMensalista(req.params.id);
  const cliente = await ClienteController.readCliente(mensalista.idCliente);
  const vagas = await VagasController.readVagas(false);

  res.render("mensalistas/update", {
    cliente: cliente,
    mensalista: mensalista,
    vagas: vagas
  })
})

//UPDATE

router.post("/:id", async(req, res) => {
  let mensalista = await MensalistaController.readMensalista(req.params.id);

  await VagasController.updateVagas({
    situacao: false
  }, mensalista.idVaga)

  await VagasController.updateVagas({
    situacao: true
  }, req.body.vagas)

  await ClienteController.updateCliente({
    nome: req.body.nome,
  }, mensalista.idCliente);

  await MensalistaController.updateMensalista({
    cpf: req.body.cpf,
    email: req.body.email,
    telefone: req.body.telefone,
    diaVencimento: req.body.diavencimento,
    dataAdmissao: req.body.dataadmissao,
    idVaga: req.body.vagas
  }, mensalista.id);
  
  res.redirect("/mensalistas")
})

router.get("/finalizar/:id", async(req, res) => {
  const date = new Date();
  const mensalista = await MensalistaController.readMensalista(req.params.id)
  console.log(mensalista)

  await MensalistaController.updateMensalista({
    dataRecisao: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }, mensalista.id)

  await VagasController.updateVagas({
    situacao: false
  }, mensalista.idVaga)

  res.redirect("/mensalistas")
})

//DELETE

router.delete("/:id", (req,res) => {
  MensalistaController.deleteMensalista(req.params.id)
})

module.exports = router;
