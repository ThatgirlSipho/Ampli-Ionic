import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastController } from '@ionic/angular'; // Replace MatSnackBar with Ionic ToastController
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent  implements OnInit {
  forgotPasswordForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private toastController: ToastController, // Replace Snackbar with Toast
    private navController: NavController
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
   }

  ngOnInit() {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 6000,
      position: 'bottom'
    });
    await toast.present();
  }

  requestPasswordReset(): void {
    if (this.forgotPasswordForm.invalid) {
      this.presentToast('Please enter a valid email address.');
      return;
    }

    const email = this.forgotPasswordForm.value.email.trim();

    this.dataService.forgotPassword(email).subscribe({
      next: (response) => {
        const message = "A password reset link has been sent to your email!";
        alert(message);
        this.navController.navigateForward('/login');
      
      },
      error: (error) => {
        console.error('Error sending password reset link:', error);

        let errorMessage = 'Failed to send password reset link';
        if (error.status === 400) {
          errorMessage = 'Invalid request - one or more validation errors occurred.';
        } else if (error.status === 500) {
          errorMessage = 'Server error - please try again later.';
        }

        this.presentToast(errorMessage);
      }
    });
  }
  goBack() {
    this.navController.back();
  }

}
