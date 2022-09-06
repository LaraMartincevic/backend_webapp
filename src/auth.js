import mongo from "mongodb";
import connect from "./db.js";

export default {
  async registerUser(userData) {
    let db = await connect();
    await db.collection("").insertOne(userData);
  },
};
