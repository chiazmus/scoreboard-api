const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const Score = {
  async findAll() {
    const result = await mongodb.getDatabase().db().collection("Scores").find();

    return await result.toArray();
  },

  async findByUserId(id) {
    const result = await mongodb.getDatabase().db().collection("Scores").find({ "userId": id });

    return await result.toArray();    
  },

  async findOne(id) {
    const ScoreId = new ObjectId(id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Scores")
      .find({ _id: ScoreId });

    return await result.toArray();
  },

  async remove(id) {
    const ScoreId = new ObjectId(id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Scores")
      .deleteOne({ _id: ScoreId });

    return result;
  },

  async create(newScore) {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Scores")
      .insertOne(newScore);

    return response;
  },

  async update(id, updatedScore) {
    const ScoreId = new ObjectId(id);
    
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Scores")
      .replaceOne({ _id: ScoreId }, updatedScore);

    return response;
  },
};

module.exports = Score;
