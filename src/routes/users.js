    
const express = require("express");
const router = express.Router();
const validation = require("./validation");

const userController = require("../controllers/userController");


router.get("/users/signup", userController.signUp);
router.post("/users/signup", validation.validateUsers, userController.create);

router.get("/users/sign_in", userController.signInForm);
router.post("/users/sign_in", validation.validateUsers, userController.signIn);



module.exports = router;