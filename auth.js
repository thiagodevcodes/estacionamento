const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const Users = require("./models/Users");
 
module.exports = function(passport){
    async function findUser(username){
        //return users.find(user => user.username === username);
        return await Users.findOne({
            where: {
                login: username
            }
        })
    }
    
    async function findUserById(id){
       //return users.find(user => user._id === id);
       return await Users.findOne({
        where: {
            id: id
        }
    })
    }

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
 
    passport.deserializeUser( async(id, done) => {
        try {
            const user = await findUserById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
        async(username, password, done) => {
            try {              
                const user = await findUser(username);
                
                // usuário inexistente
                if (!user) { return done(null, false) }
                
                // comparando as senhas
                const isValid = bcrypt.compareSync(password, user.senha);
                if (!isValid) return done(null, false)

                return done(null, user)
            } catch (err) {
                done(err, false);
            }
        }
    ));
}

