module.exports = function(req, res, next) {
    if (!req.session.isAuthenticated) {
        req.session.redirectUrl = req.headers.referer || req.originalUrl || req.url;
        return res.redirect('/google');
    }
    next();
}