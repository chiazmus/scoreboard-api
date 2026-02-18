const Acheivements = require("../models/acheivementModel");
const { accessCheck } = require("./gameController");

const getAll = async (req, res) => {
  //#swagger.tags=['Acheivements']
  try {
    const allAcheivements = await Acheivements.findAll(req.params.id);

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(allAcheivements);
  } catch (err) {
    res.status(500).json({
      message: err.message || "An error occurred while retrieving data.",
    });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Acheivements']
  try {
    const result = await Acheivements.findOne(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Acheivement not found" });
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

const achievementAccessCheck = async (req, res, acheivementId) => {
  const result = await Acheivements.findOne(acheivementId);

  if (!result) {
    return res.status(404).json({ message: "Acheivement not found" });
  }

  accessCheck(req, res, result[0].gameId);
};

const deleteSingle = async (req, res) => {
  //#swagger.tags=['Acheivements']
  try {
    achievementAccessCheck(req, res, req.params.id);

    const response = await Acheivements.remove(req.params.id);
    if (response.deletedCount > 0) res.status(204).send();
    else
      res
        .status(500)
        .json(
          response.error ||
            "An error occured while removing the Acheivement. ¯\\_(ツ)_/¯",
        );
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid data provided." });
  }
};

const updateAcheivement = async (req, res) => {
  //#swagger.tags=['Acheivements']
  try {
    achievementAccessCheck(req, res, req.params.id);

    const updatedAcheivement = {
      name: req.body.name,
      gameId: req.body.gameId,
    };
    response = await Acheivements.update(req.params.id, updatedAcheivement);
    if (response.modifiedCount > 0) res.status(201).send();
    else
      res
        .status(500)
        .json(
          response.error ||
            "An error occured while updating the Acheivement. ¯\\_(ツ)_/¯",
        );
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid data provided." });
  }
};

const createAcheivement = async (req, res) => {
  //#swagger.tags=['Acheivements']
  try {
    const newAcheivement = {
      name: req.body.name,
      gameId: req.body.gameId,
    };
    response = await Acheivements.create(newAcheivement);
    if (response.acknowledged) res.status(201).send();
    else
      res
        .status(500)
        .json(
          response.error ||
            "An error occured while creating the Acheivement. ¯\\_(ツ)_/¯",
        );
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid data provided." });
  }
};

module.exports = {
  getAll,
  deleteSingle,
  getSingle,
  updateAcheivement,
  createAcheivement,
};
