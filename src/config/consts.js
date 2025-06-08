require("dotenv").config();

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_S3_BUCKET_NAME,
} = process.env;

module.exports = {
  AWS: {
    awsAccessKeyID: AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: AWS_SECRET_ACCESS_KEY,
    awsRegion: AWS_REGION,
    awsS3BucketName: AWS_S3_BUCKET_NAME,
  },
};
