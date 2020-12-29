require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const authCtrl = require("./controllers/authController.js");

// const axios = require(axios);

const PORT = 4000;

const { SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("DB connected Master Nya~");
});

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
  })
);

app.get("/auth/logout", authCtrl.logout);
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);

app.listen(PORT, () => console.log(`Port ${PORT} Ready Master Nya~`));
