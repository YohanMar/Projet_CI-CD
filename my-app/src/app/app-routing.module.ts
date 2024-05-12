import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminConfigComponent } from './admin-config/admin-config.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'create-group', component: AdminConfigComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
