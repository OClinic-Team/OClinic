module.exports = function(req, res, next) {
    if (!req.session.authUser.Permission === 0 && !req.session.authUser.Permission === 1) {
        next();
    }
    return res.send('Not your permission');
}