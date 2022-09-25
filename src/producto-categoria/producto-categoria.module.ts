import { Module } from '@nestjs/common';
import { ProductoCategoriaService } from './producto-categoria.service';

@Module({
  providers: [ProductoCategoriaService]
})
export class ProductoCategoriaModule {}
