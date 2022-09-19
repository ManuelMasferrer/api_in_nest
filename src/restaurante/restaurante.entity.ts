
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { Column, Entity,ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RestauranteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column()
    nombre: string;
    
    @Column()
    michelin: number;
    
    @Column()
    fechaMichelin: string;


    @ManyToOne(() => CiudadEntity, ciudad => ciudad.id)
    ciudad: CiudadEntity;

    @ManyToOne(() => CulturaGastronomicaEntity, culturagastronomica => culturagastronomica.recetas )
    culturagastronomica: CulturaGastronomicaEntity;

}

