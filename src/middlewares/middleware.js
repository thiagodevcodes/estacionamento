
module.exports = {
    authenticationMiddleware: function(req, res, next) {
        if (req.isAuthenticated()) return next();
        res.redirect('/');
    },
      
    adminMiddleware: function(req, res, next) {
        if(req.user.admin == 1) return next();
        res.redirect("/rotativos");
    }
}