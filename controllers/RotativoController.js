const Rotativo = require("../models/Rotativo")
const date = new Date();

module.exports = {
    createRotativo: async function(veiculo, cliente) {
        return await Rotativo.create({ 
            dataAtendimento: date.toLocaleDateString(),
            horaEntrada: date.toLocaleTimeString(),
            horaSaida: null,
            idCliente: cliente.id,
            idVeiculo: veiculo.id
        })
    },

    readRotativos: async function(req,res) {
        return await Rotativo.findAll({
            where: {
                horaSaida: null
            }
        })
    },

    readRotativo: async function(req, res) {
        return await Rotativo.findOne({
            where: {
                id: req.params.id            
            }
        })
    },

    updateRotativo: async function(req,res) {
        return await Rotativo.update({ 
            horaEntrada: req.body.horaentrada
         }, {
            where: {
                id: req.params.id
            }
        })
    },

    deleteRotativo: async function(req,res) {
        return await Rotativo.destroy({
            where: {
                id: req.params.id
            }
        })
    },

    finallyRotativo: async function(req,res) {       
        await Rotativo.update({ horaSaida: date.toLocaleTimeString() }, {
            where: {
                id: req.params.id
            }
        })
    }
}