import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {
  arrUsers: Usuario[] | any;
  pag: number = 1;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.arrUsers = this.usuariosService.getAllUsers();
  }

  borrarUsuario(): void {
    alert('Usuario borrado');
  }
}
