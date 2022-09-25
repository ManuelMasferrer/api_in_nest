
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { CiudadRestauranteService } from './ciudad-restaurante.service';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { PaisEntity } from '../pais/pais.entity';
import { RecetaEntity } from '../receta/receta.entity';
import { RegionEntity } from '../region/region.entity';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { ProductoEntity } from '../producto/producto.entity';


describe('CiudadRestauranteService', () => {
  let service: CiudadRestauranteService;
  let ciudadRepository: Repository<CiudadEntity>;
  let restauranteRepository: Repository<RestauranteEntity>;
  let culturaRepository: Repository<CulturaGastronomicaEntity>;
  let restaurantesList: RestauranteEntity[];
  let ciudad: CiudadEntity;
  let culturagastronomica: CulturaGastronomicaEntity;
  let paisesList: PaisEntity[];
  let recetasList: RecetaEntity[];
  let productosList = [];
  
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CiudadRestauranteService],
    }).compile();

    service = module.get<CiudadRestauranteService>(CiudadRestauranteService);
    ciudadRepository = module.get<Repository<CiudadEntity>>(getRepositoryToken(CiudadEntity));
    restauranteRepository = module.get<Repository<RestauranteEntity>>(getRepositoryToken(RestauranteEntity));
    culturaRepository = module.get<Repository<CulturaGastronomicaEntity>>(getRepositoryToken(CulturaGastronomicaEntity));
    await seeDatabase();

    });
  
    const seeDatabase = async () => {
      ciudadRepository.clear();
      restauranteRepository.clear();

      //const ciudad= new CiudadEntity();
      //ciudad.nombre = faker.address.cityName();
      
      const fec: string =  new Date("2018-03-16").toISOString()
      
      for(let i =0; i< 5; i++) {
        const restaurante: RestauranteEntity = await restauranteRepository.save({
          nombre: faker.lorem.words(), 
          michelin: 2, 
          fechaMichelin: fec
        })

        restaurantesList.push(restaurante);     
      }  
        const region = new RegionEntity();
        region.nombre = faker.commerce.productName();

        culturagastronomica = await culturaRepository.save({
          nombre: faker.company.name(),
          descripcion: faker.commerce.productDescription(),
          region: region,
          recetas: recetasList,
          restaurantes: restaurantesList,
          paises: paisesList,
          productos: productosList
        })
        
        ciudad = await ciudadRepository.save({
          nombre: faker.address.cityName(),
          restaurantes: restaurantesList
        })
    }
    

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('addCiudadRestaurante agregar un Restaurante a una Ciudad', async () => {
      const newRestaurante: RestauranteEntity = await restauranteRepository.save({
        nombre: faker.company.name(),
        michelin: faker.random.numeric(3),
        fechaMichelin: faker.date.birthdate()                
      })
      |
      const newCiudad: CiudadEntity = await ciudadRepository.save({
        nombre: faker.company.name()          
      })
      
      const resultado: CiudadEntity = await service.addCiudadRestaurante(newRestaurante.id, newCiudad.id);
      expect(resultado.restaurantes.length).toBe(1);
      expect(resultado.restaurantes[0]).not.toBeNull();
      expect(resultado.restaurantes[0].nombre).toBe(newRestaurante.nombre);
      expect(resultado.restaurantes[0].michelin).toBe(newRestaurante.michelin);
      expect(resultado.restaurantes[0].fechaMichelin).toBe(newRestaurante.fechaMichelin);
       
    });


    it('addCiudadRestaurante debe producir una excepcion para una ciudad invalida', async () => {
      const newCiudad: CiudadEntity = await ciudadRepository.save({
        nombre: faker.company.name(),
        descripcion: faker.commerce.productDescription(),
      })
    
      await expect(() => service.addCiudadRestaurante("0", newCiudad.id)).rejects.toHaveProperty("message", "La Ciudad con el id proporcionado no ha sido encontrado");
    });

    it('addCiudadRestaurante debe producir una excepcion para un restaurante invalido', async () => {
      const newRestaurante: RestauranteEntity = await restauranteRepository.save({
        nombre: faker.company.name(),
        michelin: faker.random.numeric(3),
        fechaMichelin: faker.date.birthdate()                            
      })
    
      await expect(() => service.addCiudadRestaurante(newRestaurante.id,"0")).rejects.toHaveProperty("message", "El restaurante con el id proporcionado no ha sido encontrado");
    });

    // findRestaranteByCiudadIdRestauranteId(restauranteId: string, ciudadId: string)
    it('findRestaranteByCiudadIdRestauranteId debe retornar un restaurante de una ciudad', async () => {
      const restaurante: RestauranteEntity = restaurantesList[0];
      const storedRestaurante: RestauranteEntity = await service.findRestaranteByCiudadIdRestauranteId(ciudad.id, restaurante.id, )
      expect(storedRestaurante).not.toBeNull();
      expect(storedRestaurante.nombre).toBe(restaurante.nombre);
      expect(storedRestaurante.michelin).toBe(restaurante.michelin);
      expect(storedRestaurante.fechaMichelin).toBe(restaurante.fechaMichelin);
    });
  

    // findRestarantesByCiudadId(ciudadId: string): Promise<RestauranteEntity[]
    it('findRestarantesByCiudadId debe arrojar una excepcion para una ciudad invalida', async () => {
      const restaurante: RestauranteEntity = restaurantesList[0];
      await expect(()=> service.findRestarantesByCiudadId("0",restaurante.id)).rejects.toHaveProperty("message", "La Ciudad con el id proporcionado no ha sido encontrada"); 
    });
    
    it('findRestarantesByCiudadId debe arrojar una excepcion para un restaurante invalido', async () => {
      await expect(()=> service.findRestarantesByCiudadId( ciudad.id,"0")).rejects.toHaveProperty("message", "El restaurante con el id proporcionado no ha sido encontrado"); 
    });
    
    // associateRestauranteCiudad(ciudadId: string, restaurantes: RestauranteEntity[]
    it('associateRestauranteCiudad debe actualizar la lista de restaurante de una ciudad', async () => {
      const newRestaurante:RestauranteEntity = await restauranteRepository.save({
        nombre: faker.company.name(),
        michelin: faker.random.numeric(3),
        fechaMichelin: faker.date.birthdate()  
      })

      const updatedCiudad: CiudadEntity = await service.associateRestauranteCiudad(ciudad.id, [newRestaurante]);
      expect(updatedCiudad.restaurantes.length).toBe(1);
      expect(updatedCiudad.restaurantes[0]).not.toBeNull();
      expect(updatedCiudad.restaurantes[0].nombre).toBe(newRestaurante.nombre);
      expect(updatedCiudad.restaurantes[0].michelin).toBe(newRestaurante.michelin);
      expect(updatedCiudad.restaurantes[0].fechaMichelin).toBe(newRestaurante.fechaMichelin);

    });
    
    it('associateProductoCultura debe arrojar una excepcion para un producto invalido', async () => {
      const newProducto: ProductoEntity = productosList[0];
      newProducto.id = "0";
  
      await expect(()=> service.associateProductoCultura(culturagastronomica.id, [newProducto])).rejects.toHaveProperty("message", "El producto con el id proporcionado no ha sido encontrado"); 
    });  
         
    // deleteRestauranteToCiudad(ciudadId: string, restauranteId: string)
    it('deleteRestauranteToCiudad debe eliminar un restaurante de una ciudad', async () => {
      const restaurante: RestauranteEntity = productosList[0];
      
      await service.deleteRestauranteToCiudad(ciudad.id, restaurante.id);
  
      const storedCiudad: CiudadEntity = await ciudadRepository.findOne({where: {id: ciudad.id}, relations: ["restaurantes"]});
      const deletedRestaurante: RestauranteEntity = storedCiudad.restaurantes.find(a => a.id === restaurante.id);
  
      expect(deletedRestaurante).toBeUndefined();
  
    });
    
});
