import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { RestauranteEntity } from './restaurante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Cache } from 'cache-manager';
@Injectable()
export class RestauranteService {
    cacheKey: string = "restaurantes";

    constructor(
        @InjectRepository(RestauranteEntity)
       private readonly restauranteRepository: Repository<RestauranteEntity>,

       @Inject(CACHE_MANAGER)
       private readonly cacheManager: Cache
    ){}
    /*
    TRAER TODOS LOS RESTAURANTES
    */
    async findAll(): Promise<RestauranteEntity[]> {
        const cached: RestauranteEntity[] = await this.cacheManager.get<RestauranteEntity[]>(this.cacheKey);
        if(!cached){
            const restaurantes: RestauranteEntity[] = await this.restauranteRepository.find();
            await this.cacheManager.set(this.cacheKey, restaurantes);
            return restaurantes;
        
        }
        return cached;
    }

     /*
    TRAER UN RESTAURANTE POR ID
    */
    async findOne(id: string): Promise<RestauranteEntity> {
        const restaurante: RestauranteEntity = await this.restauranteRepository.findOne({where: {id} } );
        if (!restaurante)
          throw new BusinessLogicException("El restaurante con el id proporcionado no ha sido encontrado.", BusinessError.NOT_FOUND);
        return restaurante;
    }

    /*
    TRAER Obtener un restaurante con cultura gastronómica en especifico
    */
    async findRestauranteByCultura(id:string): Promise<RestauranteEntity>{
        const restaurante: RestauranteEntity = await this.restauranteRepository.findOne({where: {id}, relations: ["culturaGastronomica"] } );
        if (!restaurante)
          throw new BusinessLogicException("El restaurante con el id proporcionado no ha sido encontrado.", BusinessError.NOT_FOUND);
        return restaurante; 
    }

     /*
    CREACION RESTAURANTE
    */
    async create(restaurante: RestauranteEntity): Promise<RestauranteEntity> {
        return this.restauranteRepository.save(restaurante);
    }
    /*
    ACTUALIZACION RESTAURANTE
    */
    async update(id: string, restaurante: RestauranteEntity): Promise<RestauranteEntity> {
        const persistedRestaurante: RestauranteEntity = await this.restauranteRepository.findOne({where:{id}});
        if (!persistedRestaurante)
          throw new BusinessLogicException("El restaurante con el id proporcionado no ha sido encontrado.", BusinessError.NOT_FOUND);
        restaurante.id =id;  
        return this.restauranteRepository.save(restaurante);
    }
    /*
    ELIMINAR PRODUCTO
    */
   async delete(id: string) {
        const restaurante: RestauranteEntity = await this.restauranteRepository.findOne({where:{id}});
        if (!restaurante)
            throw new BusinessLogicException("El restaurante con el id proporcionado no ha sido encontrado.", BusinessError.NOT_FOUND);
        await this.restauranteRepository.remove(restaurante);
    }

}
