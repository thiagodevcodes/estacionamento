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

    updateVagas: async function(vaga, id) {       
        await Vagas.update({
            situacao: vaga.situacao
         }, {
            where: {
                id: id
            }
        })
    },

    deleteVaga: async function(id) {
        let vaga = await this.readVaga(id);

        if(vaga.situacao == false) {
            await Vagas.destroy({
                where: {
                    id: id
                }
            })
        }
    }
}