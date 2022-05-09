"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./ctrl");


//output
router.get("/", ctrl.output.home);
router.get("/user", ctrl.output.user);
router.get("/manager", ctrl.output.manager);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

//porcess
router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.get('/save', ctrl.process.save);

module.exports = router;