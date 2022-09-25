import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecetaEntity } from './receta.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class RecetaService {
    constructor(
        @InjectRepository(RecetaEntity)
        private readonly recetaRepository: Repository<RecetaEntity>
    ){}

    async findAll(): Promise<RecetaEntity[]>{
        return await this.recetaRepository.find({ relations: ['culturagastronomica'] });
    }

    async findOne(id: string): Promise<RecetaEntity> {
        const receta: RecetaEntity = await this.recetaRepository.findOne({where: {id}, relations: {culturagastronomica: true,},});
        if(!receta)
            throw new BusinessLogicException("La receta con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
        return receta;
    }

    async create(receta: RecetaEntity): Promise<RecetaEntity> {
        return this.recetaRepository.save(receta);
    }

    async update(id: string, receta: RecetaEntity): Promise<RecetaEntity> {
        const persistedReceta: RecetaEntity = await this.recetaRepository.findOne({where: {id}});
        if(!persistedReceta)
            throw new BusinessLogicException("La receta con el id proporcionado no ha sido encontrada.", BusinessError.NOT_FOUND)
        return await this.recetaRepository.save({...persistedReceta, ...receta});
    }

    async delete(id: string) {
        const receta = await this.recetaRepository.findOne({where: {id}});
        if(!receta)
            throw new BusinessLogicException("La receta con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
        else {
            return await this.recetaRepository.remove(receta);
        }
    }
}