const express = require('express');
const ClienteController = require("../controllers/ClienteController")
const VeiculoController = require("../controllers/VeiculoController");
const RotativoController = require("../controllers/RotativoController");
const MensalistaController = require("../controllers/MensalController")
const db = require("../models/db")
var router = express.Router();

//CREATE

router.post("/", async(req, res) => {
  const cliente = await ClienteController.createCliente({
    nome: req.body.nome,
    tipoCliente: 'Rotativo',
  });

  const veiculo = await VeiculoController.createVeiculo({
    marca: req.body.marca,
    modelo: req.body.modelo,
    placa: req.body.placa,
    cor: req.body.cor,
    idCliente: cliente.id
  })

  await RotativoController.createRotativo(veiculo, cliente);
  res.redirect("/")
})


//READ

router.get("/", async(req, res) => {
  const rotativo = await db.sequelize.query("SELECT rotativos.id, clientes.nome, veiculos.marca, veiculos.modelo, veiculos.placa, veiculos.cor, rotativos.dataatendimento, rotativos.horaentrada, rotativos.horasaida, rotativos.idcliente, rotativos.idveiculo FROM veiculos, rotativos, clientes WHERE veiculos.id = rotativos.idVeiculo AND clientes.id = rotativos.idCliente")
  res.render("index", {
    posts: rotativo[0]
    
  })
})

router.get("/:id", async(req, res) => {
  const rotativo = await RotativoController.readRotativo(req.params.id);
  const cliente = await ClienteController.readCliente(rotativo.idCliente);
  const veiculo = await VeiculoController.readVeiculo(rotativo.idVeiculo);

  res.render("update", {
    rotativo: rotativo,
    cliente: cliente,
    veiculo: veiculo
  })
})

//UPDATE

router.post("/:id", async(req, res) => {
  let rotativo = await RotativoController.readRotativo(req.params.id);
  await RotativoController.updateRotativo(req.body, rotativo);
  
  res.redirect("/")
})

router.get("/finalizar/:id", async(req, res) => {
  await RotativoController.finallyRotativo(req.params.id).then(() => {
    res.redirect("/")
  }).catch( () => {
    res.send("not found")
  })
})

//DELETE

router.delete("/:id", async(req, res) => {

})



module.exports = router;
