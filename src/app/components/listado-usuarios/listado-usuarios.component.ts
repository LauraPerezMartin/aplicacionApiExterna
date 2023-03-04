import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  arrUsers!: Usuario[] | any;
  pagActual: number = 1;
  totalPags: number | any;

  constructor(private usuariosService: UsuariosService) { }

  async cargarPagListado(numPag: number = 1): Promise<void> {
    try {
      let response = await this.usuariosService.getAllUsers(numPag);
      this.arrUsers = response.results;
      this.pagActual = numPag;
      this.totalPags = response.total_pages;
    } catch (error) {
      Swal.fire('Error', 'Error al conectarse con la base de datos', 'error')
    }
  }

  ngOnInit(): void {
    this.cargarPagListado();
  }

  borrarUsuario(iduser: string): void {
    Swal.fire({
      title: '¿Quieres borrar el usuario?',
      text: 'No podrá volver a recuperarse la información!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
      cancelButtonText: 'No'
    }).then(async (result): Promise<void> => {
      if (result.value) {
        try {
          let response = await this.usuariosService.deleteUser(iduser);
          if (response._id) {
            Swal.fire('Borrado!', 'Se ha borrado el usuario.', 'success')
          }
          this.cargarPagListado(this.pagActual);
        } catch (error) {
          Swal.fire('Error', 'Error al conectar con la base de datos', 'error')
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'No se ha borrado la información', 'error')
      }
    })
  }
}