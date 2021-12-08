module.exports = function(req, res, next) {
    if (!req.session.authUser.Permission === '0') {
        return res.send('Not your permission');
    }
    next();

}