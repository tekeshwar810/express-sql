const { log } = require("console");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,  "../uploads/")); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/avif","image/jpg"];
    if (allowedFileTypes.includes(file.mimetype)) {
      console.log("Allowed file type:", file.mimetype);
      return cb(null, true);
    }
    const extAllowed = /\.(jpg|jpeg|png|avif|webp|gif)$/i;
    if (extAllowed.test(file.originalname)) {
      console.log("Allowed file extension:", file.originalname);
      return cb(null, true);
    }
    return cb(new Error("Invalid file type. Only image files (jpg, png, avif, webp, gif) are allowed."));
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
module.exports = upload;
