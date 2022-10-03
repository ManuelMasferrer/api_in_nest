import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RestauranteDto } from '../restaurante/restaurante.dto';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CiudadRestauranteService } from './ciudad-restaurante.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../usuario/role.enum';
import { HasRoles } from '../usuario/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';


@Controller('ciudad-restaurante')
@UseInterceptors(BusinessErrorsInterceptor)
export class CiudadRestauranteController {
    constructor(private readonly ciudadRestauranteService: CiudadRestauranteService){}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':ciudadId/restaurantes/:restauranteId')
    @HasRoles(Role.Editor, Role.Admin, Role.LectorCiudad)
    async findRestaranteByCiudadIdRestauranteId(@Param('ciudadId') ciudadId: string, @Param('restauranteId') restauranteId: string): Promise<RestauranteEntity>{
       return this.ciudadRestauranteService.findRestaranteByCiudadIdRestauranteId(restauranteId, ciudadId);
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':ciudadId/restaurantes')
    @HasRoles(Role.Editor, Role.Admin, Role.LectorCiudad)
    async findRestarantesByCiudadId(@Param('ciudadId') ciudadId: string): Promise<RestauranteEntity[]>{
       return this.ciudadRestauranteService.findRestarantesByCiudadId(ciudadId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post(':ciudadId/restaurantes/:restauranteId')
    @HasRoles(Role.Editor, Role.Admin, Role.EditorCiudad)
    async addCiudadRestaurante(@Param('ciudadId') ciudadId: string, @Param('restauranteId') restauranteId: string){
       return this.ciudadRestauranteService.addCiudadRestaurante(restauranteId, ciudadId);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':ciudadId/restaurantes')
    @HasRoles(Role.Editor, Role.Admin, Role.EditorCiudad)
    async associateRestauranteCiudad(@Body() restaurantesDto: RestauranteDto[], @Param('ciudadId') ciudadId: string): Promise<CiudadEntity>{
       const restaurantes = plainToInstance(RestauranteEntity, restaurantesDto)
       return this.ciudadRestauranteService.associateRestauranteCiudad(ciudadId, restaurantes);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':ciudadId/restaurantes/:restauranteId')
    @HasRoles(Role.Borrar, Role.Admin, Role.BorrarCiudad)
    @HttpCode(204)
    async deleteRestauranteToCiudad(@Param('ciudadId') ciudadId: string, @Param('restauranteId') restauranteId: string): Promise<void>{
       return this.ciudadRestauranteService.deleteRestauranteToCiudad(ciudadId, restauranteId);
    }

}
