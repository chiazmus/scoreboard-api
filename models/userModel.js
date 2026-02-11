const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const User = {
  async findAll() {
    const result = await mongodb.getDatabase().db().collection("Users").find();

    return await result.toArray();
  },

  async findOne(id) {
    const UserId = new ObjectId(id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Users")
      .find({ _id: UserId });

    return await result.toArray();
  },

  async remove(id) {
    const UserId = new ObjectId(id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Users")
      .deleteOne({ _id: UserId });

    return result;
  },

  async create(newUser) {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Users")
      .insertOne(newUser);

    return response;
  },

  async update(id, updatedUser) {
    const userId = new ObjectId(id);
    
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Users")
      .replaceOne({ _id: userId }, updatedUser);

    return response;
  },
};

module.exports = User;
