import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importez HttpClientModule
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { AdminConfigComponent } from './admin-config/admin-config.component';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminConfigComponent,
    LoginComponent,
    UserPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Ajout de HttpClientModule pour utiliser HttpClient
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }