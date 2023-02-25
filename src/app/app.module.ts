import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado-usuarios.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { C404Component } from './components/c404/c404.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListadoUsuariosComponent,
    UsuarioComponent,
    FormularioComponent,
    C404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
