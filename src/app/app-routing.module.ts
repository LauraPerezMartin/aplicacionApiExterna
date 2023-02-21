import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado-usuarios.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: ListadoUsuariosComponent},
  {path: 'Home', component: ListadoUsuariosComponent},
  {path: 'Usuario', component: UsuarioComponent},
  {path: 'Nuevo Usuario', component: FormularioComponent},
  {path: '**', component: ListadoUsuariosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
