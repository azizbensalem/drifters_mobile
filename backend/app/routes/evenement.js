module.exports = (app) => {
  const evenement = require("../controllers/evenement");
  var router = require("express").Router();

  router.post("/coach/evenement/:token", evenement.create);
  router.get("/coach/evenement/:id/:token", evenement.find);
  router.get("/coach/evenement/:token", evenement.findAll);
  router.get("/joueur/evenement/:id", evenement.findOneEventPlayer);
  router.get("/joueur/evenement", evenement.findAllEventPlayer);
  router.put("/joueur/participer/:id/:token", evenement.eventParticipate);
  router.put("/joueur/interesser/:id/:token", evenement.eventInterest);
  router.put("/joueur/nonparticiper/:id/:token", evenement.eventNoParticipate);
  router.put("/coach/evenement/:id/:token", evenement.update);
  router.delete("/coach/evenement/:id/:token", evenement.delete);

  app.use("/api", router);
};

