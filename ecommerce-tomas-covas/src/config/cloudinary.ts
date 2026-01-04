import { v2 as cloudinary } from 'cloudinary';
import { enviroment } from './enviroment';

export const cloudinaryConfig = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: enviroment.CLOUDINARY_CLOUD_NAME,
      api_key: enviroment.CLOUDINARY_API_KEY,
      api_secret: enviroment.CLOUDINARY_API_SECRET,
    });
  },
};
