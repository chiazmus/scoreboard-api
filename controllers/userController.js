const Users = require("../models/userModel");

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const users = await Users.findAll();
    
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message || "An error occurred while retrieving data.",
    });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const result = await Users.findOne(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.setHeader("Content-Type", "application/json");
    // 200 status means successful btw.
    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({
        message: err.message || "An error occurred while retrieving data.",
      });
  }
};

const deleteSingle = async (req, res) => {
    //#swagger.tags=['Users']
    try {
    const response = await Users.remove(req.params.id);
    if (response.deletedCount > 0) res.status(204).send();
    else
      res
        .status(500)
        .json(
          response.error ||
            "An error occured while removing the User. ¯\\_(ツ)_/¯",
        );
    } catch (err) {
    res.status(400).json({ message: err.message || "Invalid data provided." });
  }
}

const updateUser = async(req, res) => {
    //#swagger.tags=['Users']
    try {
        const updatedUser = { 
            userName: req.body.username, 
            password: req.body.password,
            isAdmin: req.body.isAdmin || "false"
        };
        response = await Users.update(req.params.id, updatedUser);
        if (response.modifiedCount > 0) res.status(201).send();
        else
        res
            .status(500)
            .json(
            response.error ||
                "An error occured while updating the User. ¯\\_(ツ)_/¯",
            );
    } catch (err) {
    res.status(400).json({ message: err.message || "Invalid data provided." });
    }
}

const createUser = async(req, res) => {
    //#swagger.tags=['Users']
    try {
        const newUser = { 
            userName: req.body.username,
            password: req.body.password, 
            isAdmin: req.body.isAdmin || "false"
            };
        response = await Users.create(newUser);
        if (response.acknowledged) res.status(201).send();
        else
        res
            .status(500)
            .json(
            response.error ||
                "An error occured while creating the User. ¯\\_(ツ)_/¯",
            );
    } catch (err) {
        res.status(400).json({ message: err.message || "Invalid data provided." });
    }
}

module.exports = {getAll, deleteSingle, getSingle, updateUser, createUser};