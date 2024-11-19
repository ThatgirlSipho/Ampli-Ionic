import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommentSideBarComponent } from 'src/app/comment-side-bar/comment-side-bar.component';
import { ApplicationPageRoutingModule } from './application-routing.module';

import { ApplicationPage } from './application.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ApplicationPage,
    CommentSideBarComponent
  ],
  exports: [
    CommentSideBarComponent
  ]
})
export class ApplicationPageModule {}
