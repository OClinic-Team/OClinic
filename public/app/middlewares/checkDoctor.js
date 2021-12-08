module.exports = function(req, res, next) {
    if (!req.session.authUser.Permission === '1') {
        return res.send('Not your permission');
    }
    next();
}