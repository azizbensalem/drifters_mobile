module.exports = (app) => {
  const invitation = require("../controllers/invitation");
  var router = require("express").Router();

  router.post("/inviter/joueur/:token", invitation.inviterJoueur);

  app.use("/api/coach", router);
};
