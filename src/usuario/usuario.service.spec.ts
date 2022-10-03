import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity'
import { Role } from './role.enum';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let usuarioAdmin: Usuario;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    usuarioAdmin =  { 
      id: 1 , 
      username: "admin", 
      password: "a5CM6@1*rs65",  
      roles: [Role.Admin] 
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOne deberia retornar un usuario válido', async () => {
    // const storedUsuario: Usuario = productosList[0];
    const usuario: Usuario = await service.findOne(usuarioAdmin.username);
    expect(usuario).not.toBeNull();
    expect(usuario.username).toEqual(usuarioAdmin.username)
 });

 it('findOne deberia retornar un usuario válido', async () => {
  const usuario: Usuario = await service.findOne(usuarioAdmin.username);
  expect(usuario).not.toBeNull();
  expect(usuario.username).toEqual(usuarioAdmin.username)
});

});
