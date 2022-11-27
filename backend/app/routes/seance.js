module.exports = (app) => {
  const seance = require("../controllers/seance");
  var router = require("express").Router();

  router.post("/coach/seance/:token", seance.create);
  router.get("/coach/seance/:id/:token", seance.find);
  router.get("/joueur/seance/:id/:token", seance.findSeancePlayer);
  router.get("/coach/seance/:token", seance.findAll);
  router.get("/joueur/seance/:token", seance.findAllSeancePlayer);
  //get session containing stat using stat id
  router.get("/coach/stat", seance.findValeursStatistique);
  //get session containing stat using stat id
  router.get("/coach/competence", seance.findValeursStatistique);
  router.put("/coach/seance/:id/:token", seance.update);
  router.put("/coach/seance/feedbackSeance/:id/:token", seance.feedBackSeance);
  router.put("/coach/seance/annulerSeance/:id/:token", seance.annulerSeance);

  app.use("/api", router);
};
