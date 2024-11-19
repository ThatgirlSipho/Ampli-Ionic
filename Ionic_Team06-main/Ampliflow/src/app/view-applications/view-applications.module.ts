import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Use this instead of BrowserModule
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewApplicationsComponent } from './view-applications.component';

@NgModule({
  declarations: [
    ViewApplicationsComponent
  ],
  imports: [
    CommonModule, 
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: []
})
export class ViewApplicationsModule {}
