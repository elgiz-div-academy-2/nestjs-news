import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import config from 'src/config';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: config.cloudinary.cloudName,
      api_key: config.cloudinary.apiKey,
      api_secret: config.cloudinary.apiToken,
    });
  }

  async uploadFile(file: Express.Multer.File) {
    let result: any = await new Promise((resolve, reject) =>
      cloudinary.uploader
        .upload_stream((err, result) => {
          if (err) return reject(err);
          resolve(result);
        })
        .end(file.buffer),
    );

    return { url: result?.url };
  }
}
