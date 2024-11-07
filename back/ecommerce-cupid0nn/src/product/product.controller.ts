import {
  Controller,
  Get,
  Param,
  Put,
  Query,
  Body,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/Auth/Auth.guard';
import { Roles } from 'src/decorator/Roles.decorator';
import { Role } from 'src/user/user.enum';
import { RolesGuard } from 'src/Auth/Roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from 'src/Entityes/Products.entity';
@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 4,
  ) {
    if (page && limit) return this.productService.getProducts(page, limit);
    return this.productService.getProducts(page, limit);
  }

  @Get(':id')
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.getProduct(id);
  }
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: ProductEntity) {
    return this.productService.updateProduct(id, product);
  }
}
