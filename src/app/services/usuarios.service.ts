import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private arrUsers: Usuario[];
  private id: number = 56;

  constructor() {
    this.arrUsers = [
      {
        id: 0,
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        image: ""
      }
    ];
  }

  getAllUsers(): Usuario[] {
    return this.arrUsers;
  }
}
