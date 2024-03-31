const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const sharp = require("sharp");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const { Readable } = require("stream");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const { MONGODB_URI } = require("../config");

// Init gfs
let gfs;

mongoose.connection
  .once("open", () => {
    // Init stream
    // gfs = Grid(mongoose.connection.db, mongoose.mongo);
    // gfs.collection("uploads");
    // console.log("Grid FS Connected");

    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });
    console.log("GridFS Bucket Initialized");
  })
  .on("error", function (error) {
    console.log("GFS Error: ", error);
  });

// Create storage engine
const storage = new GridFsStorage({
  url: MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: "uploads",
        };

        resolve(fileInfo);
      });
    });
  },
});

// const multerFilter = (req, file, cb) => {

//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new AppError("Not an image!", 400), false);
//   }
// };

exports.uploadSingle = multer().single("photo");

exports.resizeAndUploadFile = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const metadata = await sharp(req.file.buffer).metadata();
  const { width, height } = metadata;

  const data = await sharp(req.file.buffer)
    .resize(
      width > height
        ? { fit: sharp.fit.contain, width: 800 }
        : { fit: sharp.fit.contain, height: 800 }
    )
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toBuffer();
  // data here directly contains the buffer object.
  const fileStream = Readable.from(data);

  // write the resized stream to the database.
  const dest = await storage.fromStream(fileStream, req, req.file);

  req.file.filename = dest.filename;

  next();
});

exports.getFile = catchAsync(async (req, res, next) => {
  const { filename } = req.params;

  const file = await gfs.find({ filename }).toArray();
  if (!file[0] || file.length === 0) {
    return next(new AppError("No file exists", 404));
  }

  res.setHeader("Content-Type", file[0].contentType);
  const readStream = gfs.openDownloadStreamByName(filename);
  readStream.pipe(res);
});
