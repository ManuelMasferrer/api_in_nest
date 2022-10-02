import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CategoriaproductoDto } from './categoriaproducto.dto';
import { CategoriaproductoEntity } from '../categoriaproducto/categoriaproducto.entity';
import {CategoriaproductoService}  from '../categoriaproducto/categoriaproducto.service';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { HasRoles } from 'src/usuario/roles.decorator';
import { Role } from 'src/usuario/role.enum';



@Controller('categoriaproducto')
@UseInterceptors(BusinessErrorsInterceptor)
export class CategoriaproductoController {
    constructor(private readonly categoriaProductoService: CategoriaproductoService){}
    
    @UseGuards(JwtAuthGuard, RolesGuard)    
    @Get()
    @HasRoles(Role.Lector, Role.Admin, Role.LectorCategoria)    
    async findAll() {
      return this.categoriaProductoService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)    
    @Get(':categoriaId')
    @HasRoles(Role.Lector, Role.Admin, Role.LectorCategoria)    
    async findOne(@Param('categoriaId') categoriaId: string) {
        return this.categoriaProductoService.findOne(categoriaId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)    
    @Post(':categoriaId')
    @HasRoles(Role.Editor, Role.Admin, Role.EditorCategoria)
    async create(@Body() CategoriaProductoDto: CategoriaproductoDto) {
        const categoriaProducto: CategoriaproductoEntity = plainToInstance(CategoriaproductoEntity, CategoriaProductoDto);
        return this.categoriaProductoService.create(categoriaProducto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)    
    @Put(':categoriaId')
    @HasRoles(Role.Editor, Role.Admin, Role.EditorCategoria)
    async update(@Param('categoriaId') categoriaId: string, @Body() CategoriaProductoDto: CategoriaproductoDto) {
        const categoriaProducto: CategoriaproductoEntity = plainToInstance(CategoriaproductoEntity, CategoriaProductoDto);
        return this.categoriaProductoService.update(categoriaId, categoriaProducto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)    
    @Delete(':categoriaId')
    @HasRoles(Role.Borrar, Role.Admin, Role.BorrarCategoria)
    @HttpCode(204)
    async delete(@Param('categoriaId') categoriaId: string) {
        return this.categoriaProductoService.delete(categoriaId);
    }
   
  
}

