module.exports = function (req, res, next) {

    // 401 Unauthorized
    // 403 Forbindden

    if (!req.user.isAdmin) return res.status(403).send('Access deined');

    next();
}