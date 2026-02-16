const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const Game = {
  async findAll(id) {
    const result = await mongodb.getDatabase().db().collection("Games").find({ "userId": id });

    return await result.toArray();
  },

  async findOne(id) {
    const gameId = new ObjectId(id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Games")
      .find({ _id: gameId });

    return await result.toArray();
  },

  async remove(id) {
    const gameId = new ObjectId(id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Games")
      .deleteOne({ _id: gameId });

    return result;
  },

  async create(newGame) {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Games")
      .insertOne(newGame);

    return response;
  },

  async update(id, updatedGame) {  
    const gameId = new ObjectId(id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Games")
      .replaceOne({ _id: gameId }, updatedGame);

    return response;
  },
};

module.exports = Game;