import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProductoDto } from '../producto/producto.dto';
import { ProductoEntity } from '../producto/producto.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CulturaProductoService } from './cultura-producto.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/usuario/role.enum';
import { HasRoles } from 'src/usuario/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
@Controller('cultura-producto')
@UseInterceptors(BusinessErrorsInterceptor)
export class CulturaProductoController {
    constructor(private readonly culturaProductoService: CulturaProductoService){}
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post(':culturaId/productos/:productoId')
    @HasRoles(Role.Editor, Role.Admin, Role.EditorCultura)
    async addProductoCultura(@Param('culturaId') culturaId: string, @Param('productoId') productoId: string): Promise<any>{
       return this.culturaProductoService.addProductoCultura(culturaId, productoId);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':culturaId/productos/:productoId')
    @HasRoles(Role.Lector, Role.Admin, Role.LectorCultura)
    async findProductoByCulturaIdAProductoId(@Param('culturaId') culturaId: string, @Param('productoId') productoId: string): Promise<ProductoEntity>{
       return this.culturaProductoService.findProductoByCulturaIdProductoId(culturaId, productoId);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':culturaId/productos')
    @HasRoles(Role.Lector, Role.Admin, Role.LectorCultura)
    async findProductosFromCultura(@Param('culturaId') culturaId: string): Promise<ProductoEntity[]>{
       return this.culturaProductoService.findProductosByCulturaId(culturaId);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':culturaId/productos')
    @HasRoles(Role.Editor, Role.Admin, Role.EditorCultura)
    async associateProductosCultura(@Body() productosDto: ProductoDto[], @Param('culturaId') culturaId: string): Promise<import("e:/Documentos/MISO/Semestre 4/APIS/MISW4403_202214_Equipo28/src/culturagastronomica/culturagastronomica.entity").CulturaGastronomicaEntity>{
       const productos = plainToInstance(ProductoEntity, productosDto)
       return this.culturaProductoService.associateProductoCultura(culturaId, productos);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':culturaId/productos/:productoId')
    @HasRoles(Role.Borrar, Role.Admin, Role.BorrarCultura)
    @HttpCode(204)
    async deleteArtworkMuseum(@Param('culturaId') culturaId: string, @Param('productoId') productoId: string): Promise<void>{
       return this.culturaProductoService.deleteProductoToCultura(culturaId, productoId);
    }


}
