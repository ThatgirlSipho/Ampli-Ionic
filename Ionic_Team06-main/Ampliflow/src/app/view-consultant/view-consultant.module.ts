import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { ViewConsultantPageRoutingModule } from './view-consultant-routing.module';

import { ViewConsultantPage } from './view-consultant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewConsultantPageRoutingModule
  ],
  declarations: [ViewConsultantPage, ImageModalComponent]
})
export class ViewConsultantPageModule {}
