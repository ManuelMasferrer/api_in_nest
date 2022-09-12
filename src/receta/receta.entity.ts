import { CulturaGastronomicaEntity } from "../culturagastronomica/culturagastronomica.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RecetaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    foto: string;

    @Column()
    preparacion: string;
    
    @Column()
    video: string;

    @ManyToOne(() => CulturaGastronomicaEntity, 
    (culturagastronomica) => culturagastronomica.recetas)
    culturagastronomica?: CulturaGastronomicaEntity;
}
