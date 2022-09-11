import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ProductoService } from '../producto/producto.service';
import { ProductoEntity } from '../producto/producto.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CategoraproductoDto } from '../categoriaproducto/categoraproducto.dto';
import { CategoriaproductoEntity } from '../categoriaproducto/categoriaproducto.entity';
import {CategoriaproductoService}  from '../categoriaproducto/categoriaproducto.service';

import { plainToInstance } from 'class-transformer';


@Controller('categoriaproducto')
@UseInterceptors(BusinessErrorsInterceptor)
export class CategoriaproductoController {
    constructor(private readonly categoriaProductoService: CategoriaproductoService){}
        
    @Get()
    async findAll() {
      return this.categoriaProductoService.findAll();
    }
    @Get(':categoriaId')
    async findOne(@Param('categoriaId') categoriaId: string) {
        return this.categoriaProductoService.findOne(categoriaId);
    }

    @Post()
    async create(@Body() CategoriaProductoDto: CategoraproductoDto) {
        const producto: CategoriaproductoEntity = plainToInstance(CategoriaproductoEntity, CategoriaProductoDto);
        return this.categoriaProductoService.create(producto);
    }

    @Put(':categoriaId')
    async update(@Param('categoriaId') categoriaId: string, @Body() CategoriaProductoDto: CategoraproductoDto) {
        const producto: CategoriaproductoEntity = plainToInstance(CategoriaproductoEntity, CategoriaProductoDto);
        return this.categoriaProductoService.update(categoriaId, producto);
    }

    @Delete(':categoriaId')
    @HttpCode(204)
    async delete(@Param('categoriaId') categoriaId: string) {
        return this.categoriaProductoService.delete(categoriaId);
    }
   
  
}

