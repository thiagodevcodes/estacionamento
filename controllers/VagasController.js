const Vagas = require("../models/Vagas");

module.exports = {
    createVaga: async function() {
        const vagas = await Vagas.findAll();
        return await Vagas.create({ 
            id: vagas.length + 1,
            situacao: false
        })
    },

    readVagas: async function() {
        return await Vagas.findAll()  
    },

    readVagasLivres: async function() {
        return await Vagas.findAll({
            where: {
                situacao: false
            }
        })  
    },

    readVagasOcupadas: async function() {
        return await Vagas.findAll({
            where: {
                situacao: true
            }
        })  
    },

    readVaga: async function(id) {
        return await Vagas.findOne({
            where: {
                id: id
            }
        })
    },

    updateVagas: async function(req,res) {
        const vaga = Vagas.findOne({
            where: {
                id: req.body.vagas
            }
        })

        const situacao = vaga.situacao
        
        await Vagas.update({
            situacao: !situacao
         }, {
            where: {
                id: req.body.vagas
            }
        })
    },

    deleteVaga: async function(numero) {
        let vaga = await this.readVaga(numero);

        if(vaga.situacao == false) {
            await Vagas.destroy({
                where: {
                    id: numero
                }
            })
        }
    }
}