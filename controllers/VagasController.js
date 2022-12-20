const Vagas = require("../models/Vagas");

module.exports = {
    createVaga: async function() {
        const vagas = await Vagas.findAll();
        return await Vagas.create({ 
            id: vagas.length + 1,
            situacao: false
        });
    },

    readVagas: async function(ocup=null) {
        let result;

        if(ocup == null) {
            result = await Vagas.findAll();
        } else {
            if(ocup == true) {
                result = await Vagas.findAll({
                    where: {
                        situacao: true
                    }
                });
            } else {
                result = await Vagas.findAll({
                    where: {
                        situacao: false
                    }
                });
            }
        }

        return result;
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