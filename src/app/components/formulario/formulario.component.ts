import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  formUsuario: FormGroup;
  usuario: Usuario | any;
  accion: string = 'Crear';
  idUser: string | any;

  constructor(
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.formUsuario = new FormGroup({
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      username: new FormControl('', []),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/)
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/)
      ]),
    })
  }

  ngOnInit(): void {
    //si la url trae la id del usuario traemos los datos del usuario y los cargamos en el formulario
    this.activatedRoute.params.subscribe(async (params: any): Promise<void> => {
      this.idUser = params.iduser;
      if (this.idUser) {
        try {
          this.accion = 'Modificar';
          this.usuario = await this.usuariosService.getUserById(this.idUser);
          this.formUsuario = new FormGroup({
            _id: new FormControl(this.idUser, []),
            first_name: new FormControl(this.usuario.first_name, [
              Validators.required,
              Validators.minLength(3)
            ]),
            last_name: new FormControl(this.usuario.last_name, [
              Validators.required,
              Validators.minLength(3)
            ]),
            username: new FormControl('', []),
            email: new FormControl(this.usuario.email, [
              Validators.required,
              Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/),
            ]),
            image: new FormControl(this.usuario.image, [
              Validators.required,
              Validators.pattern(/^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/) // comprobamos formato url http://dominio.com
            ]),
          })
        } catch (error) {
          Swal.fire('Error', 'Error al conectarse con la base de datos', 'error')
        }
      }
    })
  }

  //como no capturamos el username en el formulario, lo creamos tal y como esta en la API con de los datos del usuario
  obtenerUsername(nombre: string, apellido: string): string {
    let arrNombre: string[] = nombre.split(' ');
    let arrApellido: string[] = apellido.split(' ');
    let username: string = `${arrNombre.join('')}.${arrApellido[0]}`;
    return username;
  }

  async dataUsuario(): Promise<void> {
    let datosUsuario: Usuario = this.formUsuario.value;
    datosUsuario.username = this.obtenerUsername(datosUsuario.first_name, datosUsuario.last_name); //por si al modificar el formulario se cambia el nombre y el apellido lo creamos siempre
    if (!this.idUser) {
      try {
        let response: Usuario = await this.usuariosService.postUser(datosUsuario);
        if (response.id) {
          Swal.fire('Usuario Creado', 'El usuario se ha creado correctamente', 'success')
            .then((result) => {
              this.router.navigate(['/home'])
            })
        } else {
          Swal.fire('Error', 'El usuario no se ha creado, intentalo de nuevo', 'error')
        }
      } catch (error) {
        Swal.fire('Error', 'Error al conectarse con la base de datos', 'error')
      }
    } else {
      try {
        let response = await this.usuariosService.putUser(datosUsuario);
        if (response._id) {
          Swal.fire('Guardado', 'El usuario se ha modificado correctamente', 'success')
            .then((result) => {
              this.router.navigate(['/home'])
            })
        } else {
          Swal.fire('Error', 'El usuario que intentas editar no existe', 'error')
        }
      } catch (error) {
        Swal.fire('Error', 'Error al conectarse con la base de datos', 'error')
      }
    }
    this.formUsuario.reset()
  }

  checkControl(controlName: string, tipoError: string): boolean {
    if (this.formUsuario.get(controlName)?.hasError(tipoError) && this.formUsuario.get(controlName)?.touched) {
      return true;
    }
    return false;
  }
}