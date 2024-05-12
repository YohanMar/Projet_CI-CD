import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminConfigComponent } from './admin-config/admin-config.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminConfigComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // Ajoutez cette ligne
    AppRoutingModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
