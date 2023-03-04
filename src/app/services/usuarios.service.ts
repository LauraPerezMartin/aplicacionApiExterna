import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseURL: string = "https://peticiones.online/api/users/";

  constructor(private httpClient: HttpClient) { }

  //consultas 
  getAllUsers(pag: number = 1): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseURL}?page=${pag}`));
  }

  getUserById(iduser: string): Promise<Usuario> {
    return lastValueFrom(this.httpClient.get<Usuario>(this.baseURL + iduser));
  }

  //Crear usuario
  postUser(usuario: Usuario): Promise<Usuario> {
    return lastValueFrom(this.httpClient.post<Usuario>(this.baseURL, usuario));
  }

  //Actualizar usuario
  putUser(usuario: Usuario): Promise<Usuario> {
    return lastValueFrom(this.httpClient.put<Usuario>(this.baseURL + usuario._id, usuario))
  }

  //Borrar usuario
  deleteUser(iduser: string): Promise<Usuario> {
    return lastValueFrom(this.httpClient.delete<Usuario>(this.baseURL + iduser));
  }
}