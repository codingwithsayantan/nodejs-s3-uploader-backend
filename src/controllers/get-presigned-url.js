const s3 = require("../utils/aws");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const CONSTS = require("../config/consts");

// GET /api/aws-presigned-url
// fileName:cws.png
// contentType:image/png
exports.getPresignedUrl = async (req, res) => {
  // Get fileName and contentType from the request body
  const { fileName, contentType } = req.query;

  // Validate fileName and contentType
  if (!fileName || !contentType) {
    return res.status(400).send({
      status: false,
      message: "FileName and ContentType are required",
    });
  }

  // Ensure fileName has a valid extension
  const key = `${uuidv4()}${path.extname(fileName)}`;

  // Create parameters for the presigned URL
  const params = {
    Bucket: CONSTS.AWS.awsS3BucketName,
    Key: key, // Unique Key (Object name)
    Expires: 60 * 5, // 5 minutes
    ContentType: contentType,
  };

  try {
    // Generate the presigned URL
    const url = await s3.getSignedUrlPromise("putObject", params);

    return res.send({
      status: true,
      message: "Filename and ContentType are required",
      dataset: { url, key },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).send({
      status: false,
      message: "Failed to generate presigned URL",
    });
  }
};
