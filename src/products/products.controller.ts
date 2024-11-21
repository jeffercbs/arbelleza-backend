import { Role } from '@/auth/role.enum';
import { Roles } from '@/auth/roles.decorator';
import { View } from '@/auth/visibility.decorator';
import { Visibility } from '@/auth/visibility.enum';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @View(Visibility.Public)
  @Roles(Role.User)
  findAll(@Query('page', ParseIntPipe) page: number) {
    return this.productsService.findAll(page);
  }

  @Get(':id')
  @View(Visibility.Public)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get('category/:id')
  @View(Visibility.Public)
  findByCategory(@Param('id') name: string, @Query('page', ParseIntPipe) page: number) {
    return this.productsService.findByCategory(name, page);
  }

  @Get('offers')
  @View(Visibility.Public)
  findInOffer(@Query('page', ParseIntPipe) page: number) {
    return this.productsService.findInOffer(page);
  }

  @Patch(':id/images')
  @UseInterceptors(FileInterceptor('images'))
  @View(Visibility.Private)
  @Roles(Role.Admin)
  updateImage(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2 * 1024 * 1024,
            message: 'File too large',
          }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    return this.productsService.upladetImage(id, files);
  }

  @Patch(':id')
  @View(Visibility.Private)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @View(Visibility.Private)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
