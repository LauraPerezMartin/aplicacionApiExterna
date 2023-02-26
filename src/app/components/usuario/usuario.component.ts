import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario | any;

  constructor (
    private usuariosService: UsuariosService, 
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit (): void {
    this.activatedRoute.params.subscribe((params: any)=>{
      let iduser: number = parseInt(params.iduser);
      //let idnumber: number = parseInt(iduser);
      this.usuario = this.usuariosService.getUserById(iduser);
    })
  }

  borrarUsuario() : any {
    alert('Borrar usuario');
  }

}
