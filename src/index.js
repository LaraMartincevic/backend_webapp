import express from "express";
import cors from "cors";
import mongo from "mongodb";
import connectDB from "./db.js";
import req from "express/lib/request.js";
import res from "express/lib/response.js";
import auth from "./auth.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//rgistracija u tijeku, podatci su zaprimljeni sa fronta

app.post("/register", async (req, res) => {
  console.log("Registration called");

  //spajanje na bazu
  let db = await connectDB();
  let users = db.collection("korisniki");

  let user = {
    ime: req.body.ime,
    prezime: req.body.prezime,
    email: req.body.email,
    password: req.body.password,
  };

  //slanje na bazu
  await users.insertOne(user, function (err, res) {
    if (err) throw err;
    console.log("User inserted");
  });

  res.status(201);
  res.send("User registered");
});

//provjera logina
app.post("/login", async (req, res) => {
  console.log("Login called");

  let db = await connectDB();
  let users = db.collection("korisniki");
  console.log(req.body);

  let user_query = {
    email: req.body.email,
    password: req.body.password,
  };

  let user_options = {
    projection: {
      _id: 0,
      ime: 1,
      prezime: 1,
      email: 1,
    },
  };

  let user = await users.findOne(user_query, user_options);
  console.log(user);
  res.status(201);
  res.send(user);
});

app.listen(port, () => console.log(`app running on port: ${port}!`));
