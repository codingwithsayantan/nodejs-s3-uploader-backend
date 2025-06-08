const s3 = require("../utils/aws");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const CONSTS = require("../config/consts");
const uploadLogger = require("../utils/uploadLogger");

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
const PRESIGNED_URL_EXPIRY = 60 * 10; // 10 minutes

exports.getPresignedUrl = async (req, res) => {
  const { fileName, contentType } = req.body;

  if (!fileName || !contentType) {
    return res.status(400).json({
      status: false,
      message: "FileName and ContentType are required",
    });
  }

  const fileExtension = path.extname(fileName);
  const key = `${uuidv4()}${fileExtension}`;

  const params = {
    Bucket: CONSTS.AWS.awsS3BucketName,
    Fields: {
      key,
      "Content-Type": contentType,
    },
    Conditions: [
      ["content-length-range", 0, MAX_FILE_SIZE],
      ["eq", "$Content-Type", contentType],
    ],
    Expires: PRESIGNED_URL_EXPIRY,
  };

  try {
    const presignedPost = await s3.createPresignedPost(params);

    // Audit log for each presigned URL generation
    uploadLogger.logUploadEvent({
      ip: req.ip || req.connection?.remoteAddress || "unknown",
      fileName,
      contentType,
      key,
    });

    return res.json({
      status: true,
      message: "Presigned POST policy generated",
      dataset: { ...presignedPost, key },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: false,
      message: "Failed to generate presigned POST policy",
    });
  }
};
