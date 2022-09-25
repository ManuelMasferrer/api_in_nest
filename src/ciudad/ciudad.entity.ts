import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RestauranteEntity } from '../restaurante/restaurante.entity';

@Entity()
export class CiudadEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @OneToMany(() => RestauranteEntity, restaurante => restaurante.ciudad)      
    restaurantes: RestauranteEntity[];
       
}