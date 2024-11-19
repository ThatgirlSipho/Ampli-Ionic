import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login2faComponent } from './login2fa.component';
const routes: Routes = [
  {
    path: '',
    component: Login2faComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Login2faRoutingModule {}