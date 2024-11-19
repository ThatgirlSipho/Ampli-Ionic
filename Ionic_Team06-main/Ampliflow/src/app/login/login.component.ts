import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Login } from '../services/model';
import { NavController } from '@ionic/angular';

import { NavigationExtras } from '@angular/router'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: AccountService,
    
    private navCtrl: NavController
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  login(): void {
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;

      this.loginService.login(loginData).subscribe({
        next: (user: any) => {
          if (user.message?.includes('OTP')) {
            
            this.navCtrl.navigateForward(['/login2fa'], {
              queryParams: { username: this.loginForm.value.userName }
            });
          } else {
            console.log(loginData);
            localStorage.setItem('userName', user.username);
            localStorage.setItem('token', user.jwt);
            localStorage.setItem('role', user.role);
            
            if (user.role === "Applicant") {
            //  this.router.navigate(['/first-applicant']);
            this.navCtrl.navigateRoot('/tabs/home');
            } 
          }
        },
        error: (err) => {
          console.error('Login failed', err);
          alert('Login failed. Please check your credentials and try again.');
        }
      });
    }
  }
}
