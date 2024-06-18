const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const db = require("./models");
const { User } = require("./models");

app.use(bodyParser.json());

app.get("/insert", (req, res) => {
  User.create({
    Name: "Aditya Pardeshi",
    age: 25,
    city: "uran-islampur",
  }).catch((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send("Inserted");
});

db.sequelize.sync().then((req) => {
  app.listen(4000, "localhost", () => {
    console.log(`Server Started on 4000`);
  });
});
