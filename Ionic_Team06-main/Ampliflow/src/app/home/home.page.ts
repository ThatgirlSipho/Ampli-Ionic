import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController ,NavController} from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  applications: any[] = [];
  applicationStatuses: any[] = [];
  searchTerm: string = '';
  selectedStatus: string | null = null;
  showHelp = false; // Flag to toggle help message visibility
  selectedApplicationId!: number;

  constructor(
    private dataService: DataService,
    private toastController: ToastController,
    private alertController: AlertController,
    private navController: NavController,
  ) {}

  ngOnInit() {
    this.loadApplicationsList();
    this.loadApplicationStatuses();
  }
  async confirmDelete(applicationId: number): Promise<void> {
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
            this.deleteApplication(applicationId);
          },
        },
      ],
    });
  
    await alert.present();
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
      this.navController.navigateForward(['/application', applicationId]);
    } else {
      console.error('Invalid application ID');
    }
  }

  // Method to toggle the help message visibility
  toggleHelpMessage(): void {
    this.showHelp = !this.showHelp;
  }
}
