import { Injectable } from '@nestjs/common';
import { Role } from './role.enum';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
    private readonly usuarios = [
        { id:  1 , username: "admin", password: "a5CM6@1*rs65", roles:  [Role.Admin] } ,
        { id: 2 , username: "usuarioLectorTodos", password: "&@#M9279BwGp", roles:  [Role.Lector] } ,
        { id: 3 , username: "usuarioEditorTodos", password: "Xo376B0a#Jdg", roles:  [Role.Editor] } ,
        { id: 4 , username: "usuarioBorrarTodos", password: "%gvNu#1LY2M8", roles:  [Role.Borrar] } ,
        { id: 5 , username: "usuarioLectorRestaurante", password: "V91G1P#sV*Z^", roles:  [Role.LectorRestaurante] } ,
        { id: 6 , username: "usuarioEditorRestaurante", password: "w39E%Bxgp2Ri", roles:  [Role.EditorRestaurante] } ,
        { id: 7 , username: "usuarioBorrarRestaurante", password: "r0$jS8^m6wJ!", roles:  [Role.BorrarRestaurante] } ,
        { id: 8 , username: "usuarioLectorReceta", password: "741x8!UFLWa*", roles:  [Role.LectorReceta] } ,
        { id: 9 , username: "usuarioEditorReceta", password: "F13ub8@S$0%f", roles:  [Role.EditorReceta] } ,
        { id: 10 , username: "usuarioBorrarReceta", password: "@uRK^4b9PL0X", roles:  [Role.BorrarReceta] } ,
        { id: 11 , username: "usuarioLectorProducto", password: "ixP&rn268!^3", roles:  [Role.LectorProducto] } ,
        { id: 12 , username: "usuarioEditorProducto", password: "fT8Y7cw3@ty$", roles:  [Role.EditorProducto] } ,
        { id: 13 , username: "usuarioBorrarProducto", password: "mnRkY3$u52p6", roles:  [Role.BorrarProducto] } ,
        { id: 14 , username: "usuarioLectorPais", password: "RaFI^r03fK93", roles:  [Role.LectorPais] } ,
        { id: 15 , username: "usuarioEditorPais", password: "x6F*%j04Q3Nl", roles:  [Role.EditorPais] } ,
        { id: 16 , username: "usuarioBorrarPais", password: "10nghJ2!I58B", roles:  [Role.BorrarPais] } ,
        { id: 17 , username: "usuarioLectorCultura", password: "!7gr6XPdU4gD", roles:  [Role.LectorCultura] } ,
        { id: 18 , username: "usuarioEditorCultura", password: "l7fwe3oO0&p8", roles:  [Role.EditorCultura] } ,
        { id: 19 , username: "usuarioBorrarCultura", password: "3Fe!0Pl50qH$", roles:  [Role.BorrarCultura] } ,
        { id: 20 , username: "usuarioLectorCiudad", password: "9hn2o@D58Nn#", roles:  [Role.LectorCiudad] } ,
        { id: 21 , username: "usuarioEditorCiudad", password: "pD05R9F$hDk4", roles:  [Role.EditorCiudad] } ,
        { id: 22 , username: "usuarioBorrarCiudad", password: "X$GvZ4vQ#5q1", roles:  [Role.BorrarCiudad] } ,
        { id: 23 , username: "usuarioLectorCategoriaProducto", password: "zL53pCd81$Kb", roles:  [Role.LectorCategoria] } ,
        { id: 24 , username: "usuarioEditorCategoriaProducto", password: "dE@w2Y$0a0M7", roles:  [Role.EditorCategoria] } ,
        { id: 25 , username: "usuarioBorrarCategoriaProducto", password: "zR8PLy75Yv%%", roles:  [Role.BorrarCategoria] } ,
        { id: 26 , username: "usuarioCulturaGastronomica", password: "zR8PLy75Yv%*", roles:  [Role.LectorCultura] } ,
        { id: 27 , username: "usuarioCulturaGastronomica", password: "zR8PLy75Yv%*", roles:  [Role.EditorCultura] } ,
        { id: 28 , username: "usuarioCulturaGastronomica", password: "zR8PLy75Yv%*", roles:  [Role.BorrarCultura] } ,
        { id: 29 , username: "usuarioRegion", password: "zR8PLy75Yv%*", roles:  [Role.LectorRegion] } ,
        { id: 30 , username: "usuarioRegion", password: "zR8PLy75Yv%+", roles:  [Role.EditorRegion] } ,
        { id: 31 , username: "usuarioRegion", password: "zR8PLy75Yv%-", roles:  [Role.BorrarRegion] } 
    ];
    async findOne(username: string): Promise<Usuario | undefined> {
        return this.usuarios.find( (usuario) => usuario.username === username);
    }
}

