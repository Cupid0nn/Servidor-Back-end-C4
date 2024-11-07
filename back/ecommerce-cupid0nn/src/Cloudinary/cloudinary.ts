import { v2 as cloudinary } from 'cloudinary';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export const cloudinaryConfig = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.API_name, // se puede cambiar por tipo de dato .env pero no tengo tiempo de momento
      api_key: process.env.API_key, // se puede cambiar por tipo de dato .env pero no tengo tiempo de momento
      api_secret: process.env.API_secret, // se puede cambiar por tipo de dato .env pero no tengo tiempo de momento
    });
  }
};
