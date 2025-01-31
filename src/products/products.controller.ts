import { Roles, View } from '@/auth/decorator';
import { Role } from '@/auth/role.enum';
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
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @View(Visibility.Public)
  @Roles(Role.Admin)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('offers')
  @View(Visibility.Public)
  @Roles(Role.Anonymous)
  findInOffer(@Query('page', ParseIntPipe) page: number) {
    return this.productsService.findInOffer(page);
  }

  @Get('all')
  @View(Visibility.Public)
  @Roles(Role.Anonymous)
  findAllProducts() {
    return this.productsService.findAll();
  }

  @Get()
  @View(Visibility.Public)
  @Roles(Role.Anonymous)
  findAll(@Query('page', ParseIntPipe) page: number = 1) {
    return this.productsService.findForPages(page);
  }

  @Patch(':id')
  @View(Visibility.Private)
  @Roles(Role.Admin)
  @Roles(Role.Team)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Get(':id')
  @View(Visibility.Public)
  @Roles(Role.Anonymous)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
  @Delete(':id')
  @View(Visibility.Private)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
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
}
