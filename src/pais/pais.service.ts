import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { PaisEntity } from './pais.entity';
import { PaisDto } from './pais.dto';

@Injectable()
export class PaisService {
    constructor(
        @InjectRepository(PaisEntity)
        private readonly paisRepository: Repository<PaisEntity>
      ){}

    async findAll(): Promise<PaisDto[]>{
        return await this.paisRepository.find({ relations: {culturasgastronomicas: true,},});
    }

    async findOne(id: string): Promise<PaisDto>{
        const pais: PaisEntity = await this.paisRepository.findOne({where: {id}});
        if (!pais)
            throw new BusinessLogicException("El pais con el id proporcionado no ha sido encontrado", BusinessError.NOT_FOUND);

        return pais;
    }

    async create(pais: PaisEntity): Promise<PaisEntity>{
        return await this.paisRepository.save(pais);
    }

    async update(id: string, pais: PaisEntity): Promise<PaisEntity>{
        const persistedPais: PaisEntity = await this.paisRepository.findOne({where:{id}});
        if (!persistedPais)
            throw new BusinessLogicException("El pais con el id proporcionado no ha sido encontrado", BusinessError.NOT_FOUND);
        return await this.paisRepository.save({...persistedPais, ...pais});
    }

    async delete(id: string){
        const pais: PaisEntity = await this.paisRepository.findOne({where:{id}});
        if (!pais)
            throw new BusinessLogicException("El pais con el id proporcionado no ha sido encontrado", BusinessError.NOT_FOUND);
        await this.paisRepository.remove(pais);
    }
}