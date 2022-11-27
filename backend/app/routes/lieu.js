module.exports = (app) => {
  const lieu = require("../controllers/lieu");
  var router = require("express").Router();

  router.post("/:token", lieu.create);
  router.get("/:id/:token", lieu.find);
  router.get("/:token", lieu.findAll);
  router.get("/", lieu.findAllPublic);
  router.put("/:id/:token", lieu.update);
  router.delete("/:id/:token", lieu.delete);

  app.use("/api/coach/lieu", router);
};
