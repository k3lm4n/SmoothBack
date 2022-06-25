import multer from "multer";
import path from "path";
import crypto from "crypto";

export const StorageTrack = multer.diskStorage({
  destination:(req, file, callback) => {
    callback(null, path.resolve("uploads/audio"));
    },

  filename: (req, file, callback) => {
    const hash = crypto.randomBytes(6).toString("hex");
    const filename = `${hash}-${file.originalname}`;

    callback(null, filename);
  },
});


export const StorageVideo = multer.diskStorage({
  destination:(req, file, callback) => {
    callback(null, path.resolve("uploads/video"));
    },

  filename: (req, file, callback) => {
    const hash = crypto.randomBytes(6).toString("hex");
    const filename = `${hash}-${file.originalname}`;

    callback(null, filename);
  },
});

export const StorageImage = multer.diskStorage({
  destination:(req, file, callback) => {
    callback(null, path.resolve("uploads/image"));
    },

  filename: (req, file, callback) => {
    const hash = crypto.randomBytes(6).toString("hex");
    const filename = `${hash}-${file.originalname}`;

    callback(null, filename);
  },
});

