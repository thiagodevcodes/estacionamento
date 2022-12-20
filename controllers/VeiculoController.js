const Veiculo = require("../models/Veiculo");

module.exports = {
    createVeiculo: async function(veiculo) {
        return await Veiculo.create({ 
            marca: veiculo.marca,
            modelo: veiculo.modelo,
            placa: veiculo.placa,
            cor: veiculo.cor,
            idCliente: veiculo.idcliente
        })
    },

    readVeiculos: async function(req,res) {
        return await Veiculo.findAll()  
    },

    readVeiculo: async function(id) {
        return await Veiculo.findOne({
            where: {
                id: id
            }
        })
    },

    updateVeiculo: async function(veiculo, id) {
        await Veiculo.update({
            marca: veiculo.marca,
            modelo: veiculo.modelo,
            placa: veiculo.placa,
            cor: veiculo.cor
         }, {
            where: {
                id: id
            }
        })
    },

    finallyVeiculo: async function(req,res) {
        return await Veiculo.update({ ativo: false }, {
            where: {
                id: req.params.id
            }
        })
    },

    deleteVeiculo: async function(req,res) {
        return await Veiculo.destroy({
            where: {
                id: req.params.id
            }
        })
    }
}