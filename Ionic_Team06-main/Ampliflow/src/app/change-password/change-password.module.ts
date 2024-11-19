import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ChangePasswordComponent } from './change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordRoutingModule } from './change-password-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ChangePasswordRoutingModule
    
  ],
  declarations: [ChangePasswordComponent],
  exports: [ChangePasswordComponent]
})
export class ChangePasswordNameModule {}