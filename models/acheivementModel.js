const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const Acheivement = {
  async findAll(id) {
    const result = await mongodb.getDatabase().db().collection("Acheivements").find({ "gameId": id });

    return await result.toArray();
  },

  async findOne(id) {
    const acheivementId = new ObjectId(id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Acheivements")
      .find({ _id: acheivementId });

    return await result.toArray();
  },

  async remove(id) {

    const acheivementId = new ObjectId(id)

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Acheivements")
      .deleteOne({ _id: acheivementId });

    return result;
  },

  async create(newAcheivement) {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Acheivements")
      .insertOne(newAcheivement);

    return response;
  },

  async update(id, updatedAcheivement) {  
    const acheivementId = new ObjectId(id)

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Acheivements")
      .replaceOne({ _id: acheivementId }, updatedAcheivement);

    return response;
  },
};

module.exports = Acheivement;