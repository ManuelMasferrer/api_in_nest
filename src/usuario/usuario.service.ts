import { Injectable } from '@nestjs/common';
import { Role } from './role.enum';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
    private readonly usuarios = [
       {id: 1, username: "admin", password: "a5CM6@1*rs65", roles: [Role.Admin]},
       {id: 2, username: "usuarioLectorTodos", password: "&@#M9279BwGp", roles: [Role.Lector] },
       {id: 3, username: "usuarioEditorTodos", password: "Xo376B0a#Jdg", roles: [Role.Editor] },
       {id: 4, username: "usuarioBorrarTodos", password: "%gvNu#1LY2M8", roles: [Role.Borrar]}
    ];
    async findOne(username: string): Promise<Usuario | undefined> {
        return this.usuarios.find( (usuario) => usuario.username === username);
    }
}

