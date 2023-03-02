import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario | any;

  constructor(
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      let iduser: number = parseInt(params.iduser);
      //let idnumber: number = parseInt(iduser);
      this.usuario = this.usuariosService.getUserById(iduser);
    })
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
