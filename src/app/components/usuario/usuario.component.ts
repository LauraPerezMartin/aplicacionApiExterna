import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario!: Usuario | any;

  constructor(
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any): Promise<void> => {
      let iduser: string = params.iduser;
      try {
        this.usuario = await this.usuariosService.getUserById(iduser);
      } catch (error) {
        Swal.fire('Error', 'Error al conectarse con la base de datos', 'error')
      }
    })
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
              .then((result) => {
                this.router.navigate(['/home'])
              })
          }
        } catch (error) {
          Swal.fire('Error', 'Error al conectar con la base de datos', 'error')
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'No se ha borrado la información', 'error')
      }
    })
  }
}