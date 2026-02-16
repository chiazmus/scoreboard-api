const isAuthenticated = (req, res, next) => {
    console.log("Authenticating...");
    if (req.session.user === undefined){
        return res.status(401).json("Access Denied");
    } else {
        console.log(req.session.user);
    }
    next();
};

const isAdmin = (req, res, next) => {
    console.log("Authenticating...");
    if (req.session.user === undefined || !req.session.user.isAdmin){
        return res.status(401).json("Access Denied");
    }
    next();
};

module.exports = {isAuthenticated, isAdmin};