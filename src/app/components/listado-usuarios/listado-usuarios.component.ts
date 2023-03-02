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
  arrUsers: Usuario[] | any;
  pag: number = 1;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.arrUsers = this.usuariosService.getAllUsers();
  }

  borrarUsuario(iduser: number): void {
    let borrado: boolean;
    Swal.fire({
      title: '¿Quieres borrar el usuario?',
      text: 'No podrá volver a recuperarse la información!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        borrado = this.usuariosService.deleteUser(iduser);
        if (borrado) {
          Swal.fire(
            'Borrado!',
            'Se ha borrado el usuario.',
            'success'
          )
        } else {
          Swal.fire(
            'Error',
            'No se ha borrado la información, vuelva a intentarlo',
            'error'
          )
        }

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'No se ha borrado la información',
          'error'
        )
      }
    })
  }
}
