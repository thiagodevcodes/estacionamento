const express = require('express');
const ClienteContoller = require("../controllers/ClienteController")
const MensalistaContoller = require("../controllers/MensalController");
const db = require("../models/db")
var router = express.Router();


//POST

router.post("/", async(req, res) => {
  const cliente = await ClienteContoller.createCliente({
    nome: req.body.nome,
    tipoCliente: 'Mensalista',
  });

  await MensalistaContoller.createMensalista(req, res, cliente);
  res.redirect("/mensalista")
})


//FINNALY

router.get("/finalizar/:id", async(req, res) => {
  await MensalistaContoller.finallyMensalista(req,res).then(() => {
    res.redirect("/")
  }).catch( () => {
    res.send("not found")
  })
  
})

//READ

router.get("/", async(req, res) => {
  const mensalista = await db.sequelize.query("SELECT mensalistas.id, clientes.nome, mensalistas.cpf, mensalistas.telefone, mensalistas.email, mensalistas.diaVencimento, mensalistas.dataAdmissao, mensalistas.dataRecisao FROM mensalistas, clientes WHERE clientes.id = mensalistas.idCliente")
  console.log(mensalista[0])
  res.render("mensal", {
    posts: mensalista[0]
  })
})

router.get("/:id", async(req, res) => {
  const cliente = await ClienteContoller.readCliente(req, res);
  const mensalista = await MensalistaContoller.readMensalista(req, res);

  res.render("updatemensal", {
    cliente: cliente,
    mensalista: mensalista
  })
})

//UPDATE

router.post("/:id", async(req, res) => {
  await ClienteContoller.updateCliente(req,res);
  await MensalistaContoller.updateMensalista(req, res);

  res.redirect("/mensalista")
})

module.exports = router;
