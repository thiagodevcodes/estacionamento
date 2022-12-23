const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
    if (req.query.fail)
    res.render('login/index', { message: 'Usuário e/ou senha incorretos!' });
    else
    res.render('login/index', { message: null, title: 'Login' });
});

router.post('/',
    passport.authenticate('local', { 
        successRedirect: '/rotativos', 
        failureRedirect: '/?fail=true'
    })
);

router.get("/logout", (req, res) => {
    res.clearCookie('connect.sid').redirect("/");
})

module.exports = router;
