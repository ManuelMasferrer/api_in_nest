import { CulturagastronomicaController } from './culturagastronomica.controller';
import { CulturagastronomicaService } from './culturagastronomica.service';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturaGastronomicaEntity } from './culturagastronomica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CulturaGastronomicaEntity]), CacheModule.register()],
  controllers: [
    CulturagastronomicaController,],
  providers: [
    CulturagastronomicaService,],
})
export class CulturaGastronomicaModule { }
