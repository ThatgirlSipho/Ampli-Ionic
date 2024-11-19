import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  isLoading: boolean = true;
  @Input() profile: any;
  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(private accountService: AccountService, 
    private navCtrl: NavController,
     private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.accountService.getUserProfile().subscribe({
      next: (profile) => {
        this.profile = profile || {};  // Set profile or fallback to empty object
        this.isLoading = false;  // Set loading to false when data is loaded
      },
      error: (err) => {
        console.error('Failed to load user profile', err);
        this.isLoading = false;  // Stop loading on error
      }
    });
  }
  

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    
    // Validate file type and size
    if (file) {
      const fileType = file.type;
      const fileSize = file.size; // size in bytes
  
      if (fileType !== 'image/jpeg'&& fileType !== 'image/png') {
        alert('Please upload a JPEG or PNG image.');
        return;
      }
      
      if (fileSize > 15 * 1024 * 1024) { // 15 MB in bytes
        alert('File size must be less than 15 MB.');
        return;
      }
  
      const reader = new FileReader();
      reader.onload = () => {
        // Update the profile picture in the component for preview
        this.profile.profilePic = reader.result as string;
        this.uploadProfilePicture(file);
      };
      reader.readAsDataURL(file);
    }
  }
  
  uploadProfilePicture(file: File): void {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', this.profile.userId);

    this.accountService.uploadProfilePicture(formData).subscribe({
      next: (response) => {
        alert(response.message);
        // Update the profile picture in the component
     //   this.profile.profilePic = URL.createObjectURL(file);
     this.loadUserProfile();
      },
      error: (err) => {
        console.error('Failed to upload profile picture', err);
        alert(err.error.message || 'Failed to upload profile picture');
      }
    });
  }


  goToProfile(): void {
  //  this.router.navigate(['/update-details']);
  }
  updateDetails():void{
    this.navCtrl.navigateForward('/update-profile');
  }
viewConsultant():void{
  this.navCtrl.navigateForward('/view-consultant');
}
goToHelp():void{
  this.navCtrl.navigateForward('/help');
}
logout():void{
  localStorage.removeItem('userName');
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  
  this.navCtrl.navigateForward('/login');
}
}
