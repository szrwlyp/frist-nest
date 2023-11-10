import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Controller({ path: 'photo', version: '1' })
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post('add')
  add(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.add(createPhotoDto);
  }

  @Get()
  findAll() {
    return this.photoService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.photoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
  //   return this.photoService.update(+id, updatePhotoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.photoService.remove(+id);
  // }
}
