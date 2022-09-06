import express from "express";
import cors from "cors";
import mongo from "mongodb";
import connectDB from "./db.js";
import req from "express/lib/request.js";
import res from "express/lib/response.js";
import auth from "./auth.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//registration process
//data is recieved from fronted and sent to the 'Users' collection in the database
app.post("/register", async (req, res) => {
  //Logging to console what request has been called.
  console.log("Registration called");

  //connecting to database and required collecion
  let db = await connectDB();
  let users = db.collection("korisniki");

  //creating an object that is sent to database

  let user = {
    ime: req.body.ime,
    prezime: req.body.prezime,
    email: req.body.email,
    password: req.body.password,
  };

  //sending data into the database
  await users.insertOne(user, function (err, res) {
    if (err) throw err;
    console.log("User inserted");
  });

  res.status(201);
  res.send("User registered");
});

//login process which checks if login is correct with the database
app.post("/login", async (req, res) => {
  //Logging to console what request has been called.
  console.log("Login called");

  //connecting to the database and required collecion
  let db = await connectDB();
  let users = db.collection("korisniki");
  console.log(req.body);
  //creating query and options for searching the user in the database
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
