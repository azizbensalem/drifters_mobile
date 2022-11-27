module.exports = (app) => {
  const joueur = require("../controllers/joueur");
  var router = require("express").Router();

  router.post("/register/:token", joueur.register);
  router.post("/login", joueur.login);
  router.get("/profile/:token", joueur.showProfile);
  router.put("/profile/edit/:token", joueur.editProfile);
  router.put("/editPlayer/:id/:token", joueur.editPlayer);
  app.use("/api/joueur", router);
};
