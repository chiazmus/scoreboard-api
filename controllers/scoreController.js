const Score = require("../models/scoreModel");
const { apiCheck } = require("../utility/authenticate");

const getAll = async (req, res) => {
  //#swagger.tags=['Scores']
  try {
    const Scores = await Score.findAll();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(Scores);
  } catch (err) {
    res.status(500).json({
      message: err.message || "An error occurred while retrieving data.",
    });
  }
};

const getGameId = async (req, res, scoreId) => {
  const result = await Score.findOne(scoreId);

  if (!result) {
    return null;
  }

  return result[0].gameId;
};

const getByGame = async (req, res) => {
  //#swagger.tags=['Scores']
  try {
    api_results = await apiCheck(req, res, req.params.id);
    if (api_results === false) return res.status(401).json("Access Denied");
    else if (api_results === null) return res.status(404).json({ message: "Score not found" })

    const Scores = await Score.findByGameId(req.params.id);

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(Scores);
  } catch (err) {
    res.status(500).json({
      message: err.message || "An error occurred while retrieving data.",
    });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Scores']
  try {
    const result = await Score.findOne(req.params.id);

    if (!result) return res.status(404).json({ message: "Score not found" });

    res.setHeader("Content-Type", "application/json");
    // 200 status means successful btw.
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message || "An error occurred while retrieving data.",
    });
  }
};

const deleteSingle = async (req, res) => {
  //#swagger.tags=['Scores']
  try {
    const gameid = getGameId(req, res, req.params.id);

    if (!gameid) return res.status(404).json({ message: "Score not found" });

    api_results = await apiCheck(req, res, gameid);
    if (api_results === false) return res.status(401).json("Access Denied");
    else if (api_results === null) return res.status(404).json({ message: "Score not found" })

    const response = await Score.remove(req.params.id);

    if (response.deletedCount > 0) res.status(204).send();
    else
      res
        .status(500)
        .json(
          response.error ||
            "An error occured while removing the Score. ¯\\_(ツ)_/¯",
        );
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid data provided." });
  }
};

const updateScore = async (req, res) => {
  //#swagger.tags=['Scores']
  try {
    const gameid = getGameId(req, res, req.params.id);

    if (!gameid) return res.status(404).json({ message: "Score not found" });
    api_results = await apiCheck(req, res, gameid);
    if (api_results === false) return res.status(401).json("Access Denied");
    else if (api_results === null) return res.status(404).json({ message: "Score not found" })

    const updatedScore = {
      playerName: req.body.playerName,
      score: req.body.score,
      gameId: gameid,
    };

    response = await Score.update(req.params.id, updatedScore);
    if (response.modifiedCount > 0) res.status(201).send();
    else
      res
        .status(500)
        .json(
          response.error ||
            "An error occured while updating the Score. ¯\\_(ツ)_/¯",
        );
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid data provided." });
  }
};

const createScore = async (req, res) => {
  //#swagger.tags=['Scores']
  try {
        api_results = await apiCheck(req, res, req.body.gameId);
    if (api_results === false) return res.status(401).json("Access Denied");
    else if (api_results === null) return res.status(404).json({ message: "Score not found" })

    const newScore = {
      playerName: req.body.playerName,
      score: req.body.score,
      gameId: req.body.gameId,
    };

    response = await Score.create(newScore);
    if (response.acknowledged) res.status(201).send();
    else
      res
        .status(500)
        .json(
          response.error ||
            "An error occured while creating the Score. ¯\\_(ツ)_/¯",
        );
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid data provided." });
  }
};

module.exports = {
  getAll,
  deleteSingle,
  getSingle,
  updateScore,
  createScore,
  getByGame,
};
