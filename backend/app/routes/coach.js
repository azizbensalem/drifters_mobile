module.exports = (app) => {
  const coach = require("../controllers/coach");
  var router = require("express").Router();

  router.post("/register", coach.register);
  router.post("/login", coach.login);
  router.get("/profile/:token", coach.showProfile);
  router.get("/playerslist/:token", coach.playersList);
  router.put("/profile/edit/:token", coach.editProfile);
  router.put("/editPlayer/:id/:token", coach.editPlayer);
  router.put("/payement/:token", coach.abonnement);
  router.put("/firstlogin/:token", coach.addDiscipline);
  router.delete("/deletePlayer/:id/:token", coach.deletePlayer);

  app.use("/api/coach", router);
};
