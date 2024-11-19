import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
//import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SaveLinkDTO } from '../services/model';

@Component({
  selector: 'app-start-application',
  templateUrl: './start-application.page.html',
  styleUrls: ['./start-application.page.scss'],
})
export class StartApplicationPage implements OnInit {
  folderId: string | null = null;
  legalentityform: FormGroup;
  legalEntityTypes: any[] = [];
applicationId!: number;
selectedEntityDescription!:string;
  constructor(
    private data: DataService,
    private http: HttpClient,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    
  ) {
    this.legalentityform = this.fb.group({
      legalEntityId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadLegalEntities();
  }

  loadLegalEntities(): void {
    this.data.GetAllLegalEntityTypes().subscribe(
      data => {
        console.log('LegalEntity ', data);
        this.legalEntityTypes = data;
      },
      error => {
        console.error('Error loading legal entities', error);
      }
    );
  }

  async onSubmit(): Promise<void> {
    if (this.legalentityform.valid) {
      const loading = await this.loadingController.create({
        message: 'Submitting...',
      });
      await loading.present(); // Show the loading indicator

      const le = this.legalentityform.value;
      console.log('Submitting legal entity:', le);

      // Find the selected legal entity description
      const selectedEntity = this.legalEntityTypes.find(entity => entity.legalEntityTypeId === le.legalEntityId);
      this.selectedEntityDescription = selectedEntity ? selectedEntity.description : '';

      this.data.StartApplication(le.legalEntityId).subscribe(
        async (response) => {
          console.log('Product added successfully:', response);
          this.applicationId = response.application.applicationId;

          // Create folder on Google Drive
          await this.createFolder(this.applicationId.toString(), this.selectedEntityDescription);

          // Dismiss the loading indicator
          await loading.dismiss();
        },
        async (error) => {
          console.error('Error adding product:', error);
          // Optionally, you can display an error message to the user here

          // Dismiss the loading indicator in case of error
          await loading.dismiss();
        }
      );
    }
  }

 

  createFolder(applicationId: string, entityDescription: string): void {
    this.http.post<any>('https://amplinode-aee2frexatcbcbhr.southafricanorth-01.azurewebsites.net/create-folder', {}).subscribe(
      response => {
        this.folderId = response.folderId;
        this.saveLink();
       // this.router.navigate(['application', this.applicationId])
      },
      error => console.error('Error creating folder:', error)
    );
  }

  saveLink(): void {
    const saveLinkDTO: SaveLinkDTO = {
      applicationId: this.applicationId,
      driveLink: this.folderId ?? undefined
    };

    this.data.addLink(saveLinkDTO).subscribe(
      response => {
        console.log('Link saved successfully:', response);
        this.navCtrl.navigateForward(['/application', this.applicationId]);
      },
      error => {
        console.error('Error saving link:', error);
      }
    );
  }

  logout(): void {
    // Clear the localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // Optionally redirect to the login page or homepage
    window.location.href = '/login'; // Adjust the URL as needed
  }
  
 
}
