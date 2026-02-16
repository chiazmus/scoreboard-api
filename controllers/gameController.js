const Games = require("../models/gameModel");
const crypto = require("crypto");

const getAll = async (req, res) => {
  //#swagger.tags=['Games']
  try {
    const userId = req.session.user.userId;
    const all_games = await Games.findAll(userId);

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(all_games);
  } catch (err) {
    res.status(500).json({
      message: err.message || "An error occurred while retrieving data.",
    });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Games']
  try {
    const result = await Games.findOne(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.setHeader("Content-Type", "application/json");
    // 200 status means successful btw.
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message || "An error occurred while retrieving data.",
    });
  }
};

const accessCheck = async (req, res, gameId) => {
  const game = await Games.findOne(gameId);

  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }
  if (game.userId != req.session.user.userId) {
    return res.status(401).json("Access Denied");
  }
};

const deleteSingle = async (req, res) => {
  //#swagger.tags=['Games']
  try {
    accessCheck(req, res, req.params.id);

    const response = await Games.remove(req.params.id);
    if (response.deletedCount > 0) res.status(204).send();
    else
      res
        .status(500)
        .json(
          response.error ||
            "An error occured while removing the Game. ¯\\_(ツ)_/¯",
        );
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid data provided." });
  }
};

const updateGame = async (req, res) => {
  //#swagger.tags=['Games']
  try {
    accessCheck(req, res, req.params.id);

    const apiKey = crypto.randomBytes(32).toString("hex");
    const hashedKey = crypto.createHash("sha256").update(apiKey).digest("hex");
    const updatedGame = {
      gameName: req.body.gameName,
      gameDescription: req.body.gameDescription,
      userId: req.body.userId,
      apiKey: hashedKey,
    };
    response = await Games.update(req.params.id, updatedGame);
    if (response.modifiedCount > 0)
      res.status(201).json({
        message:
          "Game updated.  New API key Generated. Store this safely; it won't be shown again.",
        apiKey: apiKey,
      });
    else
      res
        .status(500)
        .json(
          response.error ||
            "An error occured while updating the Game. ¯\\_(ツ)_/¯",
        );
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid data provided." });
  }
};

const createGame = async (req, res) => {
  //#swagger.tags=['Games']
  try {
    const apiKey = crypto.randomBytes(32).toString("hex");
    const hashedKey = crypto.createHash("sha256").update(apiKey).digest("hex");
    const newGame = {
      gameName: req.body.gameName,
      gameDescription: req.body.gameDescription,
      userId: req.body.userId,
      apiKey: hashedKey,
    };
    response = await Games.create(newGame);
    if (response.acknowledged)
      res.status(201).json({
        message:
          "API Key generated. Store this safely; it won't be shown again.",
        apiKey: apiKey,
      });
    else
      res
        .status(500)
        .json(
          response.error ||
            "An error occured while creating the Game. ¯\\_(ツ)_/¯",
        );
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid data provided." });
  }
};

module.exports = {
  getAll,
  deleteSingle,
  getSingle,
  updateGame,
  createGame,
  accessCheck,
};
