const express = require('express');
const ClienteController = require("../controllers/ClienteController")
const VeiculoController = require("../controllers/VeiculoController");
const RotativoController = require("../controllers/RotativoController");
const VagasController = require("../controllers/VagasController");
const db = require("../models/db");
var router = express.Router();

//CREATE

router.post("/", async(req, res) => {
  const cliente = await ClienteController.createCliente({
    nome: req.body.nome,
    tipoCliente: 'Rotativo',
  });

  const vaga = await VagasController.readVaga(req.body.vagas)
  await VagasController.updateVagas({
    situacao: true
  }, req.body.vagas);

  const veiculo = await VeiculoController.createVeiculo({
    marca: req.body.marca,
    modelo: req.body.modelo,
    placa: req.body.placa,
    cor: req.body.cor,
    idCliente: cliente.id
  })

  await RotativoController.createRotativo(veiculo, cliente, vaga);
  res.redirect("/rotativos")
})

//READ

router.get("/", async(req, res) => {
  const rotativo = await db.sequelize.query("SELECT rotativos.id, clientes.nome, veiculos.marca, veiculos.modelo, veiculos.placa, veiculos.cor, rotativos.dataatendimento, rotativos.horaentrada, rotativos.horasaida, rotativos.idcliente, rotativos.idveiculo, rotativos.idVaga FROM veiculos, rotativos, clientes WHERE veiculos.id = rotativos.idVeiculo AND clientes.id = rotativos.idCliente AND rotativos.horaSaida IS null")
  const vagas = await VagasController.readVagasLivres()

  res.render("rotativos/index", {
    posts: rotativo[0],
    vagas: vagas
  })
})

router.get("/:id", async(req, res) => {
  const rotativo = await RotativoController.readRotativo(req.params.id);
  const cliente = await ClienteController.readCliente(rotativo.idCliente);
  const veiculo = await VeiculoController.readVeiculo(rotativo.idVeiculo);
  const vagas = await VagasController.readVagasLivres();

  res.render("rotativos/update", {
    rotativo: rotativo,
    cliente: cliente,
    veiculo: veiculo,
    vagas: vagas
  })
})

//UPDATE

router.post("/:id", async(req, res) => {
  let rotativo = await RotativoController.readRotativo(req.params.id);
  
  await VagasController.updateVagas({
    situacao: false
  }, rotativo.idVaga)

  await VagasController.updateVagas({
    situacao: true
  }, req.body.vagas)

  await ClienteController.updateCliente({
    nome: req.body.nome,
  }, rotativo.idCliente);

  await VeiculoController.updateVeiculo({
    marca: req.body.marca,
    modelo: req.body.modelo,
    placa: req.body.placa,
    cor: req.body.cor
  }, rotativo.idVeiculo);

  await RotativoController.updateRotativo({
    horaEntrada: req.body.horaentrada,
    dataAtendimento: req.body.dataatendimento,
    idVaga: req.body.vagas
  }, rotativo.id);

  res.redirect("/rotativos")
})

router.get("/finalizar/:id", async(req, res) => {
  const date = new Date();
  const rotativo = await RotativoController.readRotativo(req.params.id)

  await RotativoController.updateRotativo({
    horaSaida: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }, rotativo.id)

  await VagasController.updateVagas({
    situacao: false
  }, rotativo.idVaga)

  res.redirect("/rotativos")
})

//DELETE

router.delete("/:id", async(req, res) => {
  RotativoController.deleteRotativo(req.params.id);
})

module.exports = router;
