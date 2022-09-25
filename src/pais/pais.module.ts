import { Module } from '@nestjs/common';
import { PaisController } from './pais.controller';
import { PaisService } from './pais.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaisEntity } from './pais.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaisEntity])],
  controllers: [PaisController], 
  providers: [PaisService,]
})
export class PaisModule {}
