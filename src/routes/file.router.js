const express = require("express");

const { getPresignedUrl } = require("../controllers/get-presigned-url");

const fileRouter = express.Router();

fileRouter.get("/aws-presigned-url", getPresignedUrl);

module.exports = fileRouter;
