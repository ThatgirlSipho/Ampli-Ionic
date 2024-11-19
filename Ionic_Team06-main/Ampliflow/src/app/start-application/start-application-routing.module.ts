import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartApplicationPage } from './start-application.page';

const routes: Routes = [
  {
    path: '',
    component: StartApplicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartApplicationPageRoutingModule {}
