import { Injectable } from '@nestjs/common';
import { CloudinaryRepository } from './cloudinary.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/Entityes/Products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class cloudinaryService {
  constructor(private readonly CloudinaryRepository: CloudinaryRepository,
    @InjectRepository(ProductEntity) private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  async uploadImage(productId : string,file: Express.Multer.File) {
    const product = await this.productsRepository.findOneBy({ id: productId });
    // verificamos que exista primero
    if (!product) throw new Error('No se encontro el producto en la base de datos "cloudinary.service.ts"');
    
   const uploadedImage = await this.CloudinaryRepository.uploadImage(file);

   // luego actualizamos el producto

   await this.productsRepository.update(productId, {imgUrl: uploadedImage.secure_url});

   return  await this.productsRepository.findOneBy({ id: productId });
   
   
  }
}
