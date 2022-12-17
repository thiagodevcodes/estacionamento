const Cliente = require("../models/Cliente");
const Rotativo = require("../models/Rotativo");
const Veiculo = require("../models/Veiculo");
const Vaga = require("../models/Vagas");


module.exports = {
    createRotativo: async function(veiculo, cliente, vaga) {
        const date = new Date();
        return await Rotativo.create({ 
            dataAtendimento: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            horaEntrada: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
            horaSaida: null,
            idCliente: cliente.id,
            idVeiculo: veiculo.id,
            idVaga: vaga.id
        })
    },

    readRotativos: async function() {
        return await Rotativo.findAll({
            where: {
                horaSaida: null
            }
        })
    },

    readRotativo: async function(id) {
        return await Rotativo.findOne({
            where: {
                id: id    
            }
        })
    },

    updateRotativo: async function(body, rotativo) {
        await Rotativo.update({ 
            horaEntrada: body.horaentrada,
            dataAtendimento: body.dataatendimento
         }, {
            where: {
                id: rotativo.id
            }
        })

        await Cliente.update({
            nome: body.nome
        }, {
            where: {
                id: rotativo.idCliente
            }
        })

        await Veiculo.update({
            marca: body.marca,
            modelo: body.modelo,
            placa: body.placa,
            cor: body.cor
        }, {
            where: {
                id: rotativo.idVeiculo
            }
        })
    },

    deleteRotativo: async function(id) {
        return await Rotativo.destroy({
            where: {
                id: id
            }
        })
    },

    finallyRotativo: async function(id) {     
        const rotativo = await this.readRotativo(id);
        const date = new Date();
  
        await Vaga.update({
            situacao: false
        }, {
            where: {
                id: rotativo.idVaga
            }
        })

        await Rotativo.update({ horaSaida: date.toLocaleTimeString() }, {
            where: {
                id: id
            }
        })
    }
}