require("dotenv").config();
const AWS = require("aws-sdk");

const CONSTS = require("../config/consts");

AWS.config.update({
  region: CONSTS.AWS.awsRegion,
  accessKeyId: CONSTS.AWS.awsAccessKeyID,
  secretAccessKey: CONSTS.AWS.awsSecretAccessKey,
});

const s3 = new AWS.S3();

module.exports = s3;
