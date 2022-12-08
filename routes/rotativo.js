const express = require('express');
const ClienteContoller = require("../controllers/ClienteController")
const VeiculoContoller = require("../controllers/VeiculoController");
const RotativoContoller = require("../controllers/RotativoController");
const db = require("../models/db")
var router = express.Router();

//CREATE

router.post("/", async(req, res) => {
  const cliente = await ClienteContoller.createCliente({
    nome: req.body.nome,
    tipoCliente: 'Rotativo',
  });
  const veiculo = await VeiculoContoller.createVeiculo({
    marca: req.body.marca,
    modelo: req.body.modelo,
    placa: req.body.placa,
    cor: req.body.cor,
    idCliente: cliente.id
  })

  await RotativoContoller.createRotativo(veiculo, cliente);
  res.redirect("/")
})


//READ

router.get("/", async(req, res) => {
  const rotativos = await db.sequelize.query("SELECT rotativos.id, clientes.nome, veiculos.marca, veiculos.modelo, veiculos.placa, veiculos.cor, rotativos.horaentrada, rotativos.horasaida FROM veiculos, rotativos, clientes WHERE veiculos.id = rotativos.idVeiculo AND clientes.id = rotativos.idCliente")
  res.render("index", {
    posts: rotativos[0]
  })
})

router.get("/:id", async(req, res) => {
  const cliente = await ClienteContoller.readCliente(req, res)
  const veiculo = await VeiculoContoller.readVeiculo(req, res)
  const rotativo = await RotativoContoller.readRotativo(req, res)

  res.render("update", {
    veiculo: veiculo,
    cliente: cliente,
    rotativo: rotativo
  })
})

//UPDATE

router.post("/:id", async(req, res) => {
  await VeiculoContoller.updateVeiculo(req,res);
  await ClienteContoller.updateCliente(req,res);
  await RotativoContoller.updateRotativo(req, res);

  res.redirect("/")
})

router.get("/finalizar/:id", async(req, res) => {
  await RotativoContoller.finallyRotativo(req,res).then(() => {
    res.redirect("/")
  }).catch( () => {
    res.send("not found")
  })
  
})

//DELETE

router.delete("/:id", async(req, res) => {

})



module.exports = router;
