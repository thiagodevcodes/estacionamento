const express = require('express');
const ClienteContoller = require("../controllers/ClienteController")
const MensalistaContoller = require("../controllers/MensalController");
const db = require("../models/db")
const RotativoController = require("../controllers/RotativoController");
var router = express.Router();


//POST

router.post("/", async(req, res) => {
  const cliente = await ClienteContoller.createCliente({
    nome: req.body.nome,
    tipoCliente: 'Mensalista',
  });

  await MensalistaContoller.createMensalista(req, cliente);
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
  res.render("mensalistas/index", {
    posts: mensalista[0]
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
