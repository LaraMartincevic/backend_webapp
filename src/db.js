import mongo from "mongodb";

let connection_string =
  "mongodb+srv://lara:laraemili123@cluster0.pqyykvr.mongodb.net/?retryWrites=true&w=majority";

let client = new mongo.MongoClient(connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = null;

function isConnected() {
  return !!client && !!client.topology && client.topology.isConnected();
}

export default async () => {
  if (!db || !isConnected()) {
    await client.connect();
    db = client.db("korisnici");
    console.log("spojeno");
  }

  return db;
};
