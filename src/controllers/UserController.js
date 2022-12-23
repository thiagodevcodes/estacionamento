const Users = require("../models/Users");
const bcrypt = require("bcryptjs");

module.exports = {   
    createUser: async function(req,res) {
        bcrypt.hash(req.body.senha, 10, async function(err, hashedPassword) {
            let user = {
              login: req.body.login,
              senha: hashedPassword,
              email: req.body.email,
              salt: 10,
              admin: req.body.admin || false,
              ativo: true
            }

            if(req.body.confirm == req.body.senha) {
                await Users.create(user)
                .then( () => {
                    res.redirect("/users")
                }).catch( () => {
                    res.send("Not Found" + err)
                })
            }
        }) 
    },

    updateUser: async function(req,res) {
        await Users.update({...req.body}, {
            where: {
                id: id
            }
        })

        res.redirect("/users")
    },

    finallyUser: async function(req,res) {
        await Users.update({ ativo: false }, {
            where: {
                id: req.params.id
            }
        })

        res.redirect("/users")
    },

    adminUser: async function(req,res) {
        let user = await Users.findOne({ 
            where: {
                id: req.params.id
            }
        })

        let admin = user.admin;

        await Users.update({ admin: !admin }, {
            where: {
                id: req.params.id
            }
        })

        res.redirect("/users")
    },

    deleteUser: async function(req,res) {
        await Users.destroy({
            where: {
                id: req.params.id
            }
        })
    },

    readUsers: async function(req,res) {
        await Users.findAll({
            where: {
                ativo: true
            }
        })
        .then( (posts) => {
          res.render("usuarios/index", {
            posts: posts,
            title: 'Usuários'
          }) 
        }).catch( () => {
            res.send("Not Found");
        }) 
    },

    readUser: async function(req,res) {
        await Users.findOne({
            where: {
                id: req.params.id
            }
        })

        res.redirect("/users")
    }
}
