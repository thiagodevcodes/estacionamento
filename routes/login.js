const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
    if (req.query.fail)
    res.render('login', { message: 'Usuário e/ou senha incorretos!' });
    else
    res.render('login', { message: null });
});

router.post('/',
    passport.authenticate('local', { 
        successRedirect: '/', 
        failureRedirect: '/login?fail=true'
    })
);

router.get("/logout", (req, res) => {
    res.clearCookie('connect.sid').redirect("/login");
})




module.exports = router;
