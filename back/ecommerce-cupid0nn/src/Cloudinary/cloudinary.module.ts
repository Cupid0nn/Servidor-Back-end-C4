import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "src/Entityes/Products.entity";
import { cloudinaryService } from "./cloudinary.service";
import { Module } from "@nestjs/common";
import { cloudinaryConfig } from "./cloudinary";
import { CloudinaryRepository } from "./cloudinary.repository";
import { CloudinaryController } from "./cloudinary.controller";

@Module ({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    controllers: [CloudinaryController],
    providers: [cloudinaryService, CloudinaryRepository, cloudinaryConfig],
    exports: [cloudinaryService, CloudinaryRepository]
})

export class CloudinaryModule {}