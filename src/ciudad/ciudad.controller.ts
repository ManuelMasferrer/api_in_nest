

import { Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CiudadService } from './ciudad.service';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { HasRoles } from 'src/usuario/roles.decorator';
import { Role } from 'src/usuario/role.enum';


@Controller('ciudad')
@UseInterceptors(BusinessErrorsInterceptor)
export class CiudadController {
    constructor(private readonly ciudadService: CiudadService) {}
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    @HasRoles(Role.Lector, Role.Admin, Role.LectorCiudad)    
    async findAll() {
        await this.ciudadService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':CiudadId')
    @HasRoles(Role.Lector, Role.Admin, Role.LectorCiudad)
    async findOne(@Param('CiudadId') CiudadId: string){
        return await this.ciudadService.findOne(CiudadId);
    }

}


