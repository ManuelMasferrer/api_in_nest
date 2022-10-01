import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { RestauranteEntity } from '../restaurante/restaurante.entity';

@Entity()
export class CiudadEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @OneToMany(() => RestauranteEntity, (restaurante) => restaurante.ciudad)
    restaurantes: RestauranteEntity[];
       
}