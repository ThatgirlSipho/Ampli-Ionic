import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Location } from '@angular/common';
import { emailDomainValidator } from '../services/validators';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {
  profileForm: FormGroup;
  isClient: boolean = false;
  titles: any[] = [];
  presetProfileData: any = {}; 
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private navController: NavController
  ) { 
    this.profileForm = this.fb.group({
      titleId: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,emailDomainValidator]],
      cellNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      businessName: [''],
     
    });
  }

  ngOnInit() {
    this.loadUserProfile();
    this.loadTitles();
  }

  loadUserProfile(): void {
    this.accountService.getUserProfile().subscribe({
      next: (profile: any) => {
        this.isClient = profile.hasOwnProperty('businessName') && profile.hasOwnProperty('dateJoined');
        this.presetProfileData = {
          role: profile.role,
          userId: profile.userId,
          fullName: profile.fullName,
          dateJoined: profile.dateJoined,
          Title:profile.Title,
        };

        // Log or use the preset data as needed
        console.log('Preset data:', this.presetProfileData);
        this.profileForm.patchValue(profile);
      },
      error: (err) => {
        console.error('Failed to load user profile', err);
      }
    });
  }
  loadTitles(): void {
    this.accountService.getAllTitles().subscribe({
      next: (titles) => {
        this.titles = titles;
      },
      error: (err) => {
        console.error('Failed to load titles', err);
      }
    });
  }


  onSubmit(): void {
  //  console.log(this.profileForm.value)
    if (this.profileForm.valid) {
      const profileData = this.prepareProfileData();
      console.log(profileData);
      this.accountService.updateUserProfile(profileData).subscribe({
        next: (response) => {
          alert("Profile updated successfully")
          this.navController.back();
        
        },
        error: (err) => {
        alert("Failed to update profile")
        }
      });
    }
  }

  prepareProfileData(): any {
    const formValue = this.profileForm.value;
    let profileData: any;

   
      profileData = {
        ClientProfile: {
          titleId: formValue.titleId,
          name: formValue.name,
          surname: formValue.surname,
          email: formValue.email,
          cellNumber: formValue.cellNumber,
          businessName: formValue.businessName,
          userId: this.presetProfileData.userId,
          fullName: this.presetProfileData.fullName,
          dateJoined: this.presetProfileData.dateJoined,
          Title:this.presetProfileData.Title,
        }
      };
  

    return profileData;
  }
  get cellNumber() {
    return this.profileForm.get('cellNumber');
  }
  goBack() {
    this.navController.back();
  }
}
