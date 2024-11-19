import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Login2faComponent } from './login2fa.component';
import { ReactiveFormsModule } from '@angular/forms'; // Add this import
import { Login2faRoutingModule } from './login2fa-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    Login2faRoutingModule,
  ],
  declarations: [Login2faComponent],
  exports: [Login2faComponent]
})
export class Login2faModule {}

