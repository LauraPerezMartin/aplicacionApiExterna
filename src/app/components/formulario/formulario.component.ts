import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  accion: string = 'Guardar';

  constructor(
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute

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
        Validators.pattern(/^\w+@[a-zA-Z_.]+?\.[a-zA-Z]{2,5}$/),
      ]),
      image: new FormControl('', [
        Validators.required,
        //Validators.minLength(5)
        Validators.pattern(/^(http|https):\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,5}$/)
      ]),
    })
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      console.log(this.accion);
      if (params.iduser !== undefined) {
        console.log(params.iduser);
        this.accion = 'Modificar';
        let iduser: number = parseInt(params.iduser);
        this.usuario = this.usuariosService.getUserById(iduser);
        this.formUsuario = new FormGroup({
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
            Validators.pattern(/^\w+@[a-zA-Z_0-9\.]+?\.[a-zA-Z]{2,6}$/),
          ]),
          image: new FormControl(this.usuario.image, [
            Validators.pattern(/^(http|https):\/\/[a-zA-Z0-9\-\.\?@\/]$/) // comprobaros formato url http://dominio.com
          ]),
        })
      }
    })
  }

  dataNuevoUsuario() {
    if (this.accion === 'Guardar') {
      let nuevoUsuario: Usuario = this.formUsuario.value;
      let guardado: boolean = this.usuariosService.postUser(nuevoUsuario);
      if (guardado) {
        Swal.fire(
          'Usuario Creado',
          'El usuario se ha creado correctamente',
          'success'
        )
        alert('El usuario se ha creado correctamente')
      } else {
        Swal.fire(
          'Error',
          'El usuario no se ha creado, intentalo de nuevo',
          'error'
        )

      }
    } else {
      let datosUsuario: Usuario = this.formUsuario.value;
      let guardado: boolean = this.usuariosService.putUser(datosUsuario);
      if (guardado) {
        Swal.fire(
          'Guardado',
          'El usuario se ha modificado correctamente',
          'success'
        )
      } else {
        Swal.fire(
          'Error',
          'El usuario no se ha modificado, intentalo de nuevo',
          'error'
        )
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
