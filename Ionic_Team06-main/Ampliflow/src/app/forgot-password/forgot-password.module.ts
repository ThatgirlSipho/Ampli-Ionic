import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ForgotPasswordRoutingModule
  ],
  declarations: [ForgotPasswordComponent],
  exports: [ForgotPasswordComponent]
})
export class ForgotPasswordModule {}