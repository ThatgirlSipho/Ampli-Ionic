import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StartApplicationPageRoutingModule } from './start-application-routing.module';

import { StartApplicationPage } from './start-application.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, 
    StartApplicationPageRoutingModule
  ],
  declarations: [StartApplicationPage]
})
export class StartApplicationPageModule {}
