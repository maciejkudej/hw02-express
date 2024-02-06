import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(process.cwd(), "tmp"));
  },
  filename: function (req, file, cb) {
    console.log();
    cb(null, req.user._id + file.originalname);
  },
});

const upload = multer({
  storage,
});

export { upload };
