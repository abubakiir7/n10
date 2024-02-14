const { Router } = require("express");

const userRoute = require("./user.routes");

const router = Router();

router.use("/user", userRoute);

module.exports = router