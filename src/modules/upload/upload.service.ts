import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/libs/cloudinary/cloudinary.service';

@Injectable()
export class UploadService {
  constructor(private cloudinaryService: CloudinaryService) {}
  uploadToCloud(file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }
}
