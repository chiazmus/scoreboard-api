const Games = require('../models/gameModel') 
const crypto = require('crypto')

const isAuthenticated = (req, res, next) => {
    console.log("Authenticating Account Logged In...");
    if (req.session.user === undefined){
        return res.status(401).json("Access Denied");
    } else {
        console.log(req.session.user);
    }
    next();
};

const isAdmin = (req, res, next) => {
    console.log("Authenticating Admin...");
    if (req.session.user === undefined || !Boolean(req.session.user.isAdmin)){
        console.log(req.session.user);
        return res.status(401).json("Access Denied");
    }
    next();
};

const apiCheck = async (req, res, gameId) => {
  const game = await Games.findOne(gameId);
  const providedKey = req.headers['x-api-key'];
  const hashedKey = crypto.createHash("sha256").update(providedKey).digest("hex");

  if (!game) return null;
  if (game[0].apiKey != hashedKey) return false;
};

module.exports = {isAuthenticated, isAdmin, apiCheck};