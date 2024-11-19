import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewConsultantPage } from './view-consultant.page';

const routes: Routes = [
  {
    path: '',
    component: ViewConsultantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewConsultantPageRoutingModule {}
