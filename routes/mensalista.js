const express = require('express');
const ClienteContoller = require("../controllers/ClienteController")
const VeiculoContoller = require("../controllers/VeiculoController");
const RotativoContoller = require("../controllers/RotativoController");
const db = require("../models/db")
var router = express.Router();


//READ

router.get("/", async(req, res) => {
  const mensalista = await db.sequelize.query("SELECT mensalistas.id, clientes.nome, mensalistas.cpf, mensalistas.telefone, mensalistas.email, mensalistas.diaVencimento, mensalistas.dataAdmissao FROM mensalistas, clientes WHERE clientes.id = mensalistas.idCliente")
  res.render("mensal", {
    posts: mensalista[0]
  })
})

module.exports = router;
