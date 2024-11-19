import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Login2FARequest } from '../../services/model';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login2fa',
  templateUrl: './login2fa.component.html',
  styleUrls: ['./login2fa.component.scss'],
})
export class Login2faComponent  implements OnInit {

  login2FAForm: FormGroup;
  username?: string;
  request: Login2FARequest = { username: '', code: '' }; // Initialize OTP object


  constructor(
    private fb: FormBuilder,
    private dataService: AccountService,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) { 
    this.login2FAForm = this.fb.group({
      code: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.username = this.route.snapshot.queryParams['username'];

    // Add a check to ensure username is not undefined
    if (!this.username) {
      console.error('Username query parameter is missing');
      // Optionally, navigate to an error page or handle this case as needed
    }
  }

  verifyCode(): void {
    if (this.login2FAForm.valid && this.username) { // Ensure username is defined
      console.log("username: " + this.username);
      this.request.username = this.username;
      this.request.code = this.login2FAForm.value.code;
      console.log("the otp model is: ", this.request);
      this.dataService.verifyCode(this.request).subscribe(
        user => {

          console.log("the user is: ", user);
          localStorage.setItem('userName', user.username);

          localStorage.setItem('token', user.jwt);
          localStorage.setItem('role', user.role);
          if (user.role === "Applicant") {
            //  this.router.navigate(['/first-applicant']);
            this.navCtrl.navigateRoot('/tabs/home');
            } 
        },
        err => {
          console.error('Verification failed', err);
          console.error('Validation errors:', err.error.errors);
          alert(err.error.message)
        }
      );
    }
  }

}
