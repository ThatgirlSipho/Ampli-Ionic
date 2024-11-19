import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent  implements OnInit {

  resetPasswordForm: FormGroup;
  email: string | null = null;
  token: string | null = null;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    // Initialize form group with form controls
    this.resetPasswordForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];
    });
  }

  // Validator to check if passwords match
  passwordMatchValidator(formGroup: AbstractControl): { [key: string]: boolean } | null {
    return formGroup.get('password')!.value !== formGroup.get('confirmPassword')!.value ? { mismatch: true } : null;
  }

  // Custom password validator
  passwordValidator(control: any): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /\d/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const isValid = hasNumber && hasUpperCase && hasLowerCase && hasSpecialChar;
    return !isValid ? { invalidPassword: true } : null;
  }

  // Submit form and reset password
  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const resetPasswordData = {
        email: this.email,
        password: this.resetPasswordForm.value.password,
        token: this.token
      };

      // Call the API to reset the password
      this.accountService.resetPassword(resetPasswordData).subscribe(
        response => {
          alert('Your password has been reset successfully.');
          this.router.navigate(['/login']);
        },
        err => {
          console.error('Error resetting password', err);
          alert('There was an error resetting your password. Please try again later.');
        }
      );
    }
  }

  // Navigate back to the login page
  goBack(): void {
    this.router.navigate(['/login']);
  }

}
