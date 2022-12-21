const Rotativo = require("../models/Rotativo");

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

    updateRotativo: async function(rotativo, id) {
        await Rotativo.update({ 
            horaEntrada: rotativo.horaEntrada,
            dataAtendimento: rotativo.dataAtendimento,
            idVaga: rotativo.idVaga,
            horaSaida: rotativo.horaSaida
         }, {
            where: {
                id: id
            }
        })
    },

    deleteRotativo: async function(id) {
        return await Rotativo.destroy({
            where: {
                id: id
            }
        })
    }
}