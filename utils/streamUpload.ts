import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";

export const streamUpload = async (req: any) => {
  return new Promise(async (resolve, reject) => {
    let stream = await cloudinary.uploader.upload_stream(
      (error: any, result: any) => {
        if (result) {
          return resolve(result);
        } else {
          return reject(error);
        }
      }
    );
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};