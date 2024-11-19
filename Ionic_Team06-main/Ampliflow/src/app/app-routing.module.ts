import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginModule)
  },

  {
    path: 'login2fa',

    loadChildren: () => import('./login/login2fa/login2fa.module').then( m => m.Login2faModule)
  },

 
  {
    path: 'view-applications',
    loadChildren: () => import('./view-applications/view-applications.module').then( m => m.ViewApplicationsModule)
  },

  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordModule)
  },
   {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordNameModule)
  },
  {
    path: 'application/:applicationId',
    loadChildren: () => import('./Application/application/application.module').then( m => m.ApplicationPageModule)
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
 
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./update-profile/update-profile.module').then( m => m.UpdateProfilePageModule)
  },  {
    path: 'view-consultant',
    loadChildren: () => import('./view-consultant/view-consultant.module').then( m => m.ViewConsultantPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },


 


 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
