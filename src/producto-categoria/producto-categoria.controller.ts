import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put,UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { CategoriaproductoEntity } from '../categoriaproducto/categoriaproducto.entity';
import { ProductoCategoriaService } from './producto-categoria.service';
import { ProductoEntity } from '../producto/producto.entity';
import { ProductoDto } from 'src/producto/producto.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../usuario/role.enum';
import { HasRoles } from '../usuario/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';


@Controller('producto-categoria')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProductoCategoriaController {
    constructor(private readonly productoCategoriaService: ProductoCategoriaService){}
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('')
    @HasRoles(Role.Editor, Role.Admin, Role.EditorProducto)
    async addProductoCategoria(@Param('categoriaId') categoriaId: string, @Param('productoId') productoId: string){
        return await this.productoCategoriaService.addProductoCategoria(categoriaId, productoId)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':categoriaId/productos/:productoId')
    @HasRoles(Role.Lector, Role.Admin, Role.LectorProducto)
    async findProductoByCategoriaIdProductoId(@Param('categoriaId') categoriaId: string, @Param('productoId') productoId: string){
        return await this.productoCategoriaService.findProductoByCategoriaIdProductoId(categoriaId, productoId);
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':categoriaId/productos')
    @HasRoles(Role.Lector, Role.Admin, Role.LectorProducto)
    async findProductosByCategoriaId(@Param('categoriaId') categoriaId: string): Promise<ProductoEntity[]>{
            return this.productoCategoriaService.findProductosByCategoriaId(categoriaId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':categoriaId/productos')
    @HasRoles(Role.Editor, Role.Admin, Role.EditorProducto)
    async associateProductoCategoria(@Body() productosDto: ProductoDto[], @Param('categoriaId') categoriaId: string): Promise<CategoriaproductoEntity>{
        const productos = plainToInstance(ProductoEntity, productosDto)
        return await this.productoCategoriaService.associateProductoCategoria(categoriaId, productos);
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':categoriaId/productos/:productoId')
    @HasRoles(Role.Borrar, Role.Admin, Role.EditorProducto)
    @HttpCode(204)
    async deleteProductoToCategoria(@Param('categoriaId') categoriaId: string, @Param('productoId') productoId: string): Promise<void>{
        return await this.productoCategoriaService.deleteProductoToCategoria(categoriaId, productoId)
    }
}