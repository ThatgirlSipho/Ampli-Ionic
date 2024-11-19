import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { ViewApplicationsModule } from './view-applications/view-applications.module';
import { ViewApplicationsComponent } from './view-applications/view-applications.component'; // import your component

// Define your routes
const routes: Routes = [
  { path: 'view-applications', component: ViewApplicationsComponent },
  // Add other routes here
];

@NgModule({
  declarations: [
    AppComponent,
    // Other components can be declared here
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(routes),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
 
  
    ViewApplicationsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // RouteReuseStrategy provider
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService, 
      multi: true, 
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
