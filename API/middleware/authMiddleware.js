
exports.authMiddleware = function (req, res, next){
    const { user } = req.session;

    if (!user) {
        return res.status(401).json({ reason: 'You need to log in' });
    }

    if (!user.active) {
        return res.status(401).json({ reason: 'Your account is not active. Contact administrator at admin@legalapp.com' });
    }

    if (!user.validated) {
        return res.status(401).json({ reason: 'Your account is not validated. Contact administrator at admin@legalapp.com' });
    }

    req.User = user;

    console.log("Auth is working");
    next()
};
