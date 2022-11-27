module.exports = (app) => {
  const defi = require("../controllers/defi");
  var router = require("express").Router();

  router.post("/coach/defi/:token", defi.create);
  router.get("/joueur/defi/:id/:token", defi.find);
  router.get("/coach/defi/:token", defi.findAll);
  router.get("/joueur/defi/:token", defi.findAllDefiPlayer);
  router.put("/coach/defi/:id/:token", defi.update);
  router.put("/joueur/defidone/:id/:token", defi.doneDefi);
  router.get("/joueur/checkdone/:id/:token", defi.checkDone);
  router.delete("/coach/defi/:id/:token", defi.delete);

  app.use("/api", router);
};
