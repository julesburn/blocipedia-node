
    
const express = require("express");
const router = express.Router();

const wikiController = require("../controllers/wikiController");
const helper = require("../auth/helpers");
const validation = require("./validation");

router.get("/wikis", wikiController.index);
router.get("/wikis/new", wikiController.new);
router.post("/wikis/create", wikiController.create);
router.get("/wikis/newPrivate", wikiController.newPrivate);
router.post("/wikis/createPrivate", wikiController.createPrivate);
router.get("/wikis/:id", wikiController.show);
router.post("/wikis/:id/destroy", wikiController.destroy);
router.get("/wikis/:id/edit", wikiController.edit);
router.post("/wikis/:id/update", wikiController.update);
router.post("/wikis/:id/makePublic", wikiController.makePublic);
router.post("/wikis/:id/makePrivate", wikiController.makePrivate);

module.exports = router;