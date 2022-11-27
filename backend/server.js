const express = require("express");
const cors = require("cors");
const path = require("path");

// connexion avec la base de données
require("dotenv").config();
require("./config/database").connect();

const app = express();

// donner une exception à la partie react de consommer le backend
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(express.json({ limit: "50mb" }));

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./app/routes/coach")(app);
require("./app/routes/defi")(app);
require("./app/routes/invitation")(app);
require("./app/routes/lieu")(app);
require("./app/routes/joueur")(app);
require("./app/routes/programme")(app);
require("./app/routes/evenement")(app);
require("./app/routes/competence")(app);
require("./app/routes/statistique")(app);
require("./app/routes/seance")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
