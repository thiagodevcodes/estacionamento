module.exports = {
    createOrdem: async function(req, res) {
        await Ordens.create({ 
            nome: req.body.nome,
            cpf: req.body.cpf,
            telefone: req.body.telefone,
            valor: req.body.valor,
            local: req.body.local,
            data: req.body.data,
            descricao: req.body.descricao,
            ativo: true
        }).then( () => {
            res.redirect("/")
        }).catch( () => {
            res.send("Not Found");
        })
    },

    readOrdens: async function(req,res) {
        await Ordens.findAll({
            where: {
                ativo: true
            }
        })
        .then( (posts) => {
          res.render("index", {
            posts: posts,
            user: req.user
          }) 
        }).catch( () => {
            res.send("Not Found");
        })   
    },

    readOrdem: async function(req,res) {
        await Ordens.findOne({
            where: {
                id: req.params.id
            }
        })
        .then( (ordemedit) => {
            res.render("update", {
                id: ordemedit.id,
                nome: ordemedit.nome,
                cpf: ordemedit.cpf,
                telefone: ordemedit.telefone,
                valor: ordemedit.valor,
                local: ordemedit.local,
                data: ordemedit.data,
                descricao: ordemedit.descricao
            })
        }).catch( () => {
            res.send("Not Found")
        })
    },

    updateOrdem: async function(req,res) {
        await Ordens.update({ ...req.body }, {
            where: {
                id: req.params.id
            }
        })

        res.redirect("/")
    },

    finallyOrdem: async function(req,res) {
        await Ordens.update({ ativo: false }, {
            where: {
                id: req.params.id
            }
        })

        res.redirect("/")
    },

    deleteOrdem: async function(req,res) {
        await Ordens.destroy({
            where: {
                id: req.params.id
            }
        })

        res.redirect("/")
    }
}