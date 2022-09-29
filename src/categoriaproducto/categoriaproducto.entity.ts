import { ProductoEntity } from '../producto/producto.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  } from 'typeorm';


@Entity()
export class CategoriaproductoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;
   
    @OneToMany(() => ProductoEntity, (producto) => producto.categoriaProducto )
    productos: ProductoEntity[];

}