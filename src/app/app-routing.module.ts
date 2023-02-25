import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado-usuarios.component';
import { C404Component } from './components/c404/c404.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: ListadoUsuariosComponent },
  { path: 'usuario/:iduser', component: UsuarioComponent },
  { path: 'nuevo-usuario', component: FormularioComponent },
  { path: 'modificar-usuario/:iduser', component: FormularioComponent },
  { path: '**', component: C404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
