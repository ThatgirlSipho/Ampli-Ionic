import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-view-consultant',
  templateUrl: './view-consultant.page.html',
  styleUrls: ['./view-consultant.page.scss'],
})
export class ViewConsultantPage implements OnInit {
  consultant :any;


  constructor(private accountService : AccountService, private modalController: ModalController, private navController: NavController) { }

  ngOnInit(): void {
    this.loadUserProfile()
  }
  loadUserProfile(): void {
    this.accountService.GetConsultantProfile().subscribe({
      next: (profile) => this.consultant = profile,
      error: (err) => console.error('Failed to load user profile', err)
    });
}
async openImageModal() {
  const modal = await this.modalController.create({
    component: ImageModalComponent,
    componentProps: {
      imageSrc: this.consultant?.profilePic ? `data:image/jpeg;base64,${this.consultant.profilePic}` : 'assets/profile.jpg',
    }
  });
  return await modal.present();
}

goBack(): void {
  this.navController.back();
}

}
