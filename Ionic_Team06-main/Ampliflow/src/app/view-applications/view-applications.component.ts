import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
//import { Location } from '@angular/common';

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.scss'],
})
export class ViewApplicationsComponent implements OnInit {
  applications: any[] = [];
  applicationStatuses: any[] = [];
  searchTerm: string = '';
  selectedStatus: string | null = null;
  showHelp = false; // Flag to toggle help message visibility
  progressValue: number = 0;

  constructor(
    private dataService: DataService,
   // private router: Router,
    private toastController: ToastController, // For toast notifications
    private alertController: AlertController, // For confirmation dialogs
   // private location: Location
  ) {}

  ngOnInit() {
    this.loadApplicationsList();
    this.loadApplicationStatuses();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending Upload':
        return 'status-pending-upload';
      case 'Uploaded':
        return 'status-uploaded';
      case 'Submitted':
        return 'status-submitted';
      case 'Approved':
        return 'status-approved';
      case 'Declined':
        return 'status-declined';
      default:
        return '';
    }
  }

  loadApplicationsList(): void {
    this.dataService.GetMyApplication().subscribe((data) => {
      this.applications = data;
      this.applyFilters(); // Apply filters after loading applications
      this.applications.forEach((application) => {
        this.dataService.getProgressBar(application.applicationId).subscribe((progress) => {
          application.progress = progress; // Assign progress to each application
        });
      });
    });
  }

  loadApplicationStatuses(): void {
    this.dataService.GetAllApplicationStatus().subscribe((data) => {
      this.applicationStatuses = data;
    });
  }

  applyFilters(): void {
    this.filteredApplications();
  }

  filteredApplications(): any[] {
    return this.applications.filter((application) => {
      const matchesSearchTerm = this.searchTerm
        ? Object.values(application).some((val) => val?.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
        : true;
      const matchesStatus = this.selectedStatus
        ? application.applicationStatusDescription === this.selectedStatus
        : true;
      return matchesSearchTerm && matchesStatus;
    });
  }

  resumeApplication(applicationId: number): void {
    if (applicationId && applicationId > 0) {
   //   this.router.navigate(['/sapplication', applicationId], { queryParams: { step: 0 } });
    } else {
      console.error('Invalid application ID');
    }
  }

  async deleteApplication(applicationId: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this application?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.dataService.deleteApplication(applicationId).subscribe(
              async () => {
                this.loadApplicationsList();
                const toast = await this.toastController.create({
                  message: 'Application deleted successfully',
                  duration: 3000,
                });
                toast.present();
              },
              async (error) => {
                const toast = await this.toastController.create({
                  message: 'Failed to delete application',
                  duration: 3000,
                });
                toast.present();
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast(message: string, duration: number = 3000): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
    });
    toast.present();
  }

  logout(): void {
    // Clear the localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // Optionally redirect to the login page or homepage

    
    // Optionally redirect to the login page or homepage
   // window.location.href = '/login'; // Adjust the URL as needed
  }

  goBack(): void {
  //  this.location.back();
  }

  // Method to toggle the help message visibility
  toggleHelpMessage(): void {
    this.showHelp = !this.showHelp;
  }
  
}
