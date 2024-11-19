import { Component, OnInit,HostListener, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, AbstractControl  } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Application, LegalEntityDependant, IdentificationType,ExistingCollections, IndustryRegulatoryBody, LegalEntityTypes, AuthorizedSignatory, Shareholder, CollectionType, Seft,Eft, CardPayment,Cash, DebiCheck,Product, AuthenticationMechanisms, SelectedProduct, MandateTypes,ProcessingCode, DebtorManagementSystem, LegalEntityStructures, AlternativeSupplierReason } from 'src/app/services/model';
import { MatSelectChange } from '@angular/material/select';
import { MatStepper} from '@angular/material/stepper';
import { MatOptionSelectionChange } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCheckboxChange } from '@angular/material/checkbox';
//import PlaceResult = google.maps.places.PlaceResult;
//import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
//import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
//import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentSideBarComponent } from 'src/app/comment-side-bar/comment-side-bar.component';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
//import { AssistService } from 'src/app/services/assist.service';
//import { AssistModalComponent } from 'src/app/assist-modal/assist-modal.component';
import { IonSelectCustomEvent } from '@ionic/core';
//import { IonSteps } from '@ionic/angular'; // Import IonSteps
import { IonInput } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { emailDomainValidator } from 'src/app/services/validators';
import { NavController } from '@ionic/angular';
declare var google: any;
interface UploadFile {
  file: File;
  name: string;
  progress: number;
  uploading: boolean;
  link?: string;
  docId?: number;
  uploaded?: boolean;
}

@Component({
  selector: 'app-application',
  templateUrl: './application.page.html',
  styleUrls: ['./application.page.scss'],
})
export class ApplicationPage implements OnInit {
  applicationForm: FormGroup;
  identificationTypes: IdentificationType[] = [];
  legalEntityTypes: LegalEntityTypes[] = [];
  legalEntityStructures: LegalEntityStructures[]=[]
  applicationId = 1;
  isLoading = false;
  industryRegulatoryBodies: IndustryRegulatoryBody[] = [];
  collectionTypes: CollectionType[] = [];
  mandateTypes: MandateTypes [] = []; //code added by ropa and njabulo
  selectedCollectionTypes=new Set<number>();
  selectedProducts = new Set<number>();
  products: Product[] = [];
  authenticationMechanisms: AuthenticationMechanisms[]=[];
  banks: any[] = [];
  accountTypes: any[] = [];
   requiredDocuments: any[] = [];
  selectedFiles: UploadFile[] = [];
  entityDescription: string = '';
  folderId:string ='';
  isDragOver = false;
  legalEntityTypeId!:number;
  sameAddress: boolean = false;
  debtorManagementSystems:DebtorManagementSystem[]=[];
  applicationStatusId!:number;
  alternativeSupplierReasons:AlternativeSupplierReason[]=[]
legalDescription: string='';
  stepIndex: number = 0;
  eftCredits: any[] = [];
  eWalletOptions: any[] = [];
  selectedEftCreditId: number | null = null;
  selectedEwalletOptionId: number | null = null;
  errorMessage: string | null = null;
  missingValues: string[] = [];
  accountForm: FormGroup;
  accounts: any[] = [];
  selectedAccount: any = null;
  capitecAetAccount: any = null;
  showAccountForm: boolean = false;
  newlyAddedAccount:{ [index: number]: any } = {};
  selectedAccountId:any;
  radioOptions:any;
  previousAccount: { [index: number]: any } = {};
  steps = Array(12).fill(null);  // Create an array with 12 steps
  selectedStep = 0;  
  googleMapsLoaded = false;
 /*  requiredDocuments = [
    { description: 'Document 1', applicationRequiredDocumentId: 1, submittedDocuments: [] },
    { description: 'Document 2', applicationRequiredDocumentId: 2, submittedDocuments: [] },
  ]; */
@ViewChild('commentSidebar') commentSidebar!: CommentSideBarComponent; 
 //@ViewChild('stepper', { static: false }) stepper!:  IonSteps;
 
 @ViewChild('physicalAddressInput', { static: false }) physicalAddressInput!: IonInput;
 @ViewChild('postalAddressInput', { static: false }) postalAddressInput!: IonInput;
 @ViewChild('eftDeliveryAddressInput', { static: false }) eftDeliveryAddressInput!: IonInput;
  constructor(private dataService: DataService, private fb: FormBuilder,private route: ActivatedRoute, 
    private router: Router, private http: HttpClient,
  private location:Location, private navCtrl: NavController) {
    this.accountForm = this.fb.group({
      accountHolderName: ['', Validators.required],
      accountNumber: ['', [Validators.required,Validators.pattern(/^\d{6,10}$/)]],
      bankNameId: ['', Validators.required],
      branchName: ['', Validators.required],
      accountTypeId: ['', Validators.required]
    });
    this.applicationForm = this.fb.group({
      legalEntityDependants: this.fb.array([]),
      collectionTypeIds: [[]],
      productIds:[[]],
      legalEntityName: ['',Validators.required],
      legalEntityRegistrationNumber: ['',[Validators.pattern(/^(?:\d{4}\/\d{4,10}\/\d{2})$/)]],
      legalEntityTradingName: [''],
      legalEntityPhysicalAddress: [''],
      legalEntityPostalAddress: [''],
      vatRegistrationNumber: ['', [Validators.pattern(/^4\d{9}$/)]],
      industryDescription: [''],
      regulatoryBodyRegistrationNumber: [''],
      industryRegulatoryBodyId: [null],
      vatRegisteredBool: [],
      branchOutletBoolean: [],
      callCenterBoolean: [],
      existingPaymentProviderBoolean: [false],
      mandateTypeId: [null ],
      masterUserFullName: [''],
      masterUserIdnumber: ['',[Validators.pattern(/^\d{13}$/)]],
      masterUserEmail: ['', [Validators.email,emailDomainValidator]],
      masterUserMobileNumber: ['',[Validators.pattern(/^0\d{9}$/)]],
      masterUserCapacity: [''],
      otherIndustryBody: [''],
      masterUserDependantBit: [null], 
      shareholders: this.fb.array([]),
      authorizedSignatories: this.fb.array([]),
      processingcodes: this.fb.array([]),
      otherSupplierReasons: this.fb.array([]),
    /*   numberofFixedDevices: [null],
      numberofMobileDevices: [null], */
  // selectedCollectionTypes: this.fb.array([]),
      aetEmail: ['',[Validators.email,emailDomainValidator]],
      monthlyProcessingLimit: ['', [Validators.pattern(/^\d{1,10}$/)] ],

      cardPayment: this.fb.group({
        monthlyDebitValue: [null, [
          Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)  // Matches a number up to 12 digits with optional 2 decimal places
        ]],
        monthlyCreditValue: [null, [
          Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)  // Matches a number up to 12 digits with optional 2 decimal places
        ]],
        currentServiceProvider: [''
      //    , [
      //    Validators.maxLength(255)  // Max length of 255 characters
      //  ]
      ],
        debitCommission: [null, [
          Validators.pattern(/^\d{1,3}(\.\d{1,2})?$/)  // Matches a number up to 5 digits with optional 2 decimal places
        ]],
        creditCommission: [null, [
          Validators.pattern(/^\d{1,3}(\.\d{1,2})?$/)  // Matches a number up to 5 digits with optional 2 decimal places
        ]]
      }),
    cash: this.fb.group({
      monthlyValue: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]], // Pattern allows up to 10 digits before the decimal and 2 after
      monthlyVolume: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]], // Same pattern as monthlyValue
      successRate: [null, [Validators.pattern(/^\d{1,3}(\.\d{1,2})?$/)]],
      electronicBoolean: [null]
    }),
    debiCheck: this.fb.group({
      monthlyValue: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]], // Pattern allows up to 12 digits before the decimal and 2 after
     monthlyVolume: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]], // Same pattern as monthlyValue
     successRate: [null, [Validators.pattern(/^\d{1,3}(\.\d{1,2})?$/)]], // Pattern allows up to 5 digits before the decimal and 2 after
     existingDispute: [null, [Validators.pattern(/^\d{1,3}(\.\d{1,2})?$/)]], // Same pattern as successRate
     averageTrackingDaysUsed: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]], // Pattern allows up to 10 digits before the decimal and 2 after
    }),
    eft: this.fb.group({
      monthlyValue: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]], // Pattern allows up to 12 digits before the decimal and 2 after
      monthlyVolume: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]], // Same pattern as monthlyValue
      successRate: [null, [Validators.pattern(/^\d{1,3}(\.\d{1,2})?$/)]], // Pattern allows up to 5 digits before the decimal and 2 after
      existingDispute: [null, [Validators.pattern(/^\d{1,3}(\.\d{1,2})?$/)]], 
    }),
    seft: this.fb.group({
      monthlyValue: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]], // Pattern allows up to 12 digits before the decimal and 2 after
      monthlyVolume: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]], // Same pattern as monthlyValue
      successRate: [null, [Validators.pattern(/^\d{1,3}(\.\d{1,2})?$/)]], // Pattern allows up to 5 digits before the decimal and 2 after
    }),

    /*  deviceSelections: this.fb.group({
      deviceSelectionId: [0],
      selectedProductId: [null],
      numberofFixedDevices: [null],
      numberofMobileDevices: [null]
    }), */


    debiCheckProducts: this.fb.group({
   //   debiCheckProductId: [0],
      authenticationMechanismsId: [null],
      selectedProductId: [null],
      totalValueMonthly: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]],
      maximumSingleCollection: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]]
    }),
    debitCreditPayments: this.fb.group({
    //  debitCreditPaymentId: [0],
      selectedProductId: [null],
      totalMonthlyValue: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]],
      averageTransactionalValue: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]],
      balanceEnquiryBool: [null],
      budgetFacilityBool: [null],
      cashBackatPosBool: [null],
      maximumSingleTransactionalValue: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]]
    }),
    socialGrantEfts: this.fb.group({
    //  socialGrantEftId: [0],
      selectedProductId: [null],
      monthlyValue: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]]
    }),
    avs: this.fb.group({
    //  avId: [0],
      selectedProductId: [null],
      avsRNumberofRequestsMonthly: [null,  [Validators.pattern(/^\d{1,10}$/)]],
      numberofRequestsMonthly: [null ,[Validators.pattern(/^\d{1,10}$/)]]
    }),
    allpsManagementPlatforms: this.fb.group({
    //  allpsManagementPlatformId: [0],
      selectedProductId: [null],
      expectedMonthlyRequests: [null, [Validators.pattern(/^\d{1,10}$/)]],
      feePayableAuthenticationSuccess: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]],
      feePayableDocumentCollection: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]],
      automaticExpiration: [null, [Validators.pattern(/^\d{1,10}$/)]],
      automaticRevoke: [null, [Validators.pattern(/^\d{1,10}$/)]]
    }),
    eftDebits: this.fb.group({
    //  eftDebitId: [0],
      selectedProductId: [null],
      totalValue: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]],
      maximumSingleCollection: [null, [Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]]
    }),
    eftcreditDetail: this.fb.group({
      deliveryAddress:[''],
    //  eftcreditDetailId:[0],
      ewalletOptionId:[null],
      numberOfCards:[null, [Validators.pattern(/^\d{1,10}$/)]],
      numberOfPinMailers:[null, [Validators.pattern(/^\d{1,10}$/)]],
      selectedProductId: [null],
      eftCreditId:[null]
    }),
    accountForm1: this.fb.group({
      accountId:null,
      accountHolderName: [''],
      accountNumber: [null,[Validators.pattern(/^\d{6,10}$/)]],
      accountTypeId: null,
      bankNameId: null,
      branchName: [''],
      debitBool: [true],
      aetBool: [false],
      backUpDebitBool: [false]
     
    }),
    accountForm2: this.fb.group({
      accountId:null,
      accountHolderName: [''],
      accountNumber: [null,[Validators.pattern(/^\d{6,10}$/)]],
      accountTypeId: null,
      bankNameId: null,
      branchName: [''],
      minimumDailyTransferLimit: [null, [Validators.pattern(/^\d{1,10}$/)]],
      debitBool: [false],
      aetBool: [true],
      backUpDebitBool: [false]
     
    }),
   
  });
  

  }

  ngAfterViewInit() {
    this.loadGoogleMapsScript().then(() => {
      this.googleMapsLoaded = true;
    });
  }

  loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC5eqzcJ3szPIQFvQFRArEyAJNJOnoMJzM&libraries=places'; // Replace with your API key
        script.async = true;
        script.defer = true;

        script.onload = () => resolve();
        script.onerror = (error: any) => {
          console.error('Google Maps script failed to load.', error);
          reject();
        };

        document.body.appendChild(script);
      } else {
        resolve(); // If already loaded
      }
    });
  }

  initAutocomplete(addressInput: IonInput, addressType: string) {
    if (!this.googleMapsLoaded) {
      console.error('Google Maps is not loaded yet');
      return;
    }

    // Access the native input element from IonInput
    addressInput.getInputElement().then((inputElement: HTMLInputElement) => {
      const autocomplete = new google.maps.places.Autocomplete(inputElement, {
        types: ['geocode'],
        componentRestrictions: { country: 'ZA' },
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const address = place.formatted_address;

        if (addressType === 'physical') {
          this.applicationForm.patchValue({ legalEntityPhysicalAddress: address });
        } else if (addressType === 'postal') {
          this.applicationForm.patchValue({ legalEntityPostalAddress: address });
        } else if (addressType === 'delivery') {
          this.applicationForm.patchValue({ deliveryAddress: address });
        }
      });
    });
  }

  onProcessingCodeAddressSelected(input: IonInput, index: number) {
    input.getInputElement().then((element: HTMLInputElement) => {
      const autocomplete = new google.maps.places.Autocomplete(element, {
        types: ['geocode'],
        componentRestrictions: { country: 'ZA' },
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const address = place.formatted_address;
        this.processingcodes.at(index).patchValue({ physicalAddress: address });
      });
    });
  }

  copyAddress(checked: boolean): void {
    if (checked) {
      const physicalAddress = this.applicationForm.get('legalEntityPhysicalAddress')?.value;
      this.applicationForm.patchValue({ legalEntityPostalAddress: physicalAddress });
    }
  }

    
  addSupplierReason(): void {
    const supplierReasonGroup = this.fb.group({
      alternativeSupplierReasonsId: [null], // Validators.required
      otherDescription: ['']
    });
    this.otherSupplierReasons.push(supplierReasonGroup);
    this.onAlternativeSupplierReasonsChange(supplierReasonGroup);
  }

    onAlternativeSupplierReasonsChange(supplierReasonGroup: FormGroup): void {
    supplierReasonGroup.get('alternativeSupplierReasonsId')?.valueChanges.subscribe((values: number[]) => {
      if ((values ?? []).includes(7)) {
        supplierReasonGroup.get('otherDescription')?.setValidators([]); //Validators.required
      } else {
        supplierReasonGroup.get('otherDescription')?.clearValidators();
      }
      supplierReasonGroup.get('otherDescription')?.updateValueAndValidity();
    });
  }


  transformFormData(formData: any): any {
    formData.otherSupplierReasons = formData.otherSupplierReasons
      .map((reason: any) => {
        // Ensure alternativeSupplierReasonsId is an array
        const ids = Array.isArray(reason.alternativeSupplierReasonsId)
          ? reason.alternativeSupplierReasonsId
          : [];
  
        return ids.map((id: number) => ({
          alternativeSupplierReasonsId: id,
          otherDescription: id === 7 ? reason.otherDescription : null
        }));
      })
      .flat();
  
    return formData;
  }
  
  
  /* transformFormData(formData: any): any {
    formData.otherSupplierReasons = formData.otherSupplierReasons.map((reason: any) => {
      return reason.alternativeSupplierReasonsId.map((id: number) => ({
        alternativeSupplierReasonsId: id,
        otherDescription: id === 7 ? reason.otherDescription : null
      }));
    }).flat();

    return formData;
  } */




  onIndustryRegulatoryBodyChange(): void {
    this.applicationForm.get('industryRegulatoryBodyId')?.valueChanges.subscribe(value => {
      if (value == 5) {
        this.applicationForm.get('otherIndustryBody')?.setValidators([]); //Validators.required
      } else {
        this.applicationForm.get('otherIndustryBody')?.clearValidators();
      }
      this.applicationForm.get('otherIndustryBody')?.updateValueAndValidity();
    });
  }


  onVatRegisteredChange(): void {
    this.applicationForm.get('vatRegisteredBool')?.valueChanges.subscribe(value => {
      if (!value) {
        this.applicationForm.get('vatRegistrationNumber')?.setValue(null);
      }
    });
  }


  populateFormFromAPI(applicationId: number): void {
    this.dataService.GetApplication(applicationId).subscribe(value => {
      console.log('API response:', value);
      this.applicationForm.patchValue({
        legalEntityName: value.legalEntityName,
        legalEntityRegistrationNumber: value.legalEntityRegistrationNumber,
        legalEntityTradingName: value.legalEntityTradingName,
        legalEntityPhysicalAddress: value.legalEntityPhysicalAddress,
        legalEntityPostalAddress: value.legalEntityPostalAddress,
        vatRegisteredBool: value.vatRegisteredBool,
        vatRegistrationNumber: value.vatRegistrationNumber,
        industryRegulatoryBodyId: value.industryRegulatoryBodyId,
        // otherRegistrationNumber: value.otherRegistrationNumber,
        // otherRegulatoryBody: value.otherRegulatoryBody,
        industryDescription: value.industryDescription,
        regulatoryBodyRegistrationNumber : value.regulatoryBodyRegistrationNumber,
        masterUserFullName: value.masterUserFullName,
        masterUserIdnumber: value.masterUserIdnumber,
        masterUserEmail: value.masterUserEmail,
        masterUserMobileNumber: value.masterUserMobileNumber,
        masterUserCapacity: value.masterUserCapacity,
        branchOutletBoolean: value.branchOutletBoolean,
        callCenterBoolean: value.callCenterBoolean,
        existingPaymentProviderBoolean: value.existingPaymentProviderBoolean,
        aetEmail: value.aetEmail,
        processingMonthlyLimit: value.processingMonthlyLimit,
        mandateTypeId: value.mandateTypeId,
        driveLink:value.driveLink,
        otherIndustryBody:value.otherIndustryBody,
        monthlyProcessingLimit:value.monthlyProcessingLimit
      });

      if (value.accounts?.$values && value.accounts.$values.length > 0) {
        const account1 = value.accounts.$values[0];
        this.applicationForm.patchValue({
          accountForm1: {
            accountId:account1.accountId,
            accountHolderName: account1.accountHolderName,
            accountNumber: account1.accountNumber,
            accountTypeId: account1.accountTypeId,
            bankNameId: account1.bankNameId,
            branchName: account1.branchName,
            debitBool: account1.debitBool,
            aetBool: account1.aetBool
          }
        });
        
       
        if (value.accounts.$values.length > 1) {
          const account2 = value.accounts.$values[1];
          this.applicationForm.patchValue({
            accountForm2: {
              accountId:account2.accountId,
              accountHolderName: account2.accountHolderName,
              accountNumber: account2.accountNumber,
              accountTypeId: account2.accountTypeId,
              bankNameId: account2.bankNameId,
              branchName: account2.branchName,
              minimumDailyTransferLimit: account2.minimumDailyTransferLimit,
              debitBool: account2.debitBool,
              aetBool: account2.aetBool
            }
          });
        }}
      
        const otherSuppliersReasons = value.otherSuppliersReasons?.$values || [];
        const otherDesc= otherSuppliersReasons.map((reason: any) => reason.otherDescription)
        const combinedReasonIds = otherSuppliersReasons.map((reason: any) => reason.alternativeSupplierReasonsId);
    
        // Update the form control with the combined array of IDs
        this.applicationForm.patchValue({
          otherSupplierReasons: [{
            alternativeSupplierReasonsId: combinedReasonIds,
            otherDescription: String(otherDesc)
          }]
        });


        
      const legalEntityDependants = value.legalEntityDependants?.$values || [];
      if (legalEntityDependants.length === 0) {
        this.addDependant(); // Add an empty dependant if none are present
      } else {
        this.loadDependants(legalEntityDependants);
      }
    //  this.loadDependants(value.legalEntityDependants?.$values || []);
      this.loadAuthorizedSignatories(value.authorizedSignatories?.$values || []);
      this.loadShareholders(value.shareholders?.$values || []);
     // this.loadProcessingCodes(value.processingCodes?.$values || []);

      const existingCollections = value.existingCollections?.$values || [];
      const selectedCollectionTypeIds = existingCollections.map((collection: any) => collection.collectionTypeId);
      this.applicationForm.patchValue({
        collectionTypeIds: selectedCollectionTypeIds
      });
    this.selectedCollectionTypes = new Set<number>(selectedCollectionTypeIds);
      existingCollections.forEach((collection: any) => {
         
             const debiChecks = collection.debiChecks?.$values || [];
             if (debiChecks.length > 0) {
                 const debiCheck = debiChecks[0];
                 console.log('DebiCheck Object:', debiCheck);
                 this.applicationForm.get('debiCheck')?.patchValue({
                  monthlyValue: debiCheck.monthlyValue,
                  monthlyVolume: debiCheck.monthlyVolume,
                  successRate: debiCheck.successRate,
                  existingDispute: debiCheck.existingDispute,
                  averageTrackingDaysUsed: debiCheck.averageTrackingDaysUsed
              });
             }
                  if (collection.efts && collection.efts.$values.length > 0) {
                      const eft = collection.efts.$values[0];
                      this.applicationForm.get('eft')?.patchValue({
                          monthlyValue: eft.monthlyValue,
                          monthlyVolume: eft.monthlyVolume,
                          successRate: eft.successRate,
                          existingDispute: eft.existingDispute
                      });
                  }
           
                  if (collection.sefts && collection.sefts.$values.length > 0) {
                      const seft = collection.sefts.$values[0];
                      this.applicationForm.get('seft')?.patchValue({
                          monthlyValue: seft.monthlyValue,
                          monthlyVolume: seft.monthlyVolume,
                          successRate: seft.successRate
                      });
                  }
          
                  if (collection.cardPayments && collection.cardPayments.$values.length > 0) {
                      const cardPayment = collection.cardPayments.$values[0];
                      this.applicationForm.get('cardPayment')?.patchValue({
                          monthlyDebitValue: cardPayment.monthlyDebitValue,
                          monthlyCreditValue: cardPayment.monthlyCreditValue,
                          currentServiceProvider: cardPayment.currentServiceProvider,
                          debitCommission: cardPayment.debitCommission,
                          creditCommission: cardPayment.creditCommission
                      });
                  }
              
                  if (collection.cashes && collection.cashes.$values.length > 0) {
                      const cash = collection.cashes.$values[0];
                      this.applicationForm.get('cash')?.patchValue({
                          monthlyValue: cash.monthlyValue,
                          monthlyVolume: cash.monthlyVolume,
                          successRate: cash.successRate,
                          electronicBoolean: cash.electronicBoolean
                      });
                  }
               //   break;

              // Add more cases if there are other collection types
          
      });

    
      const selectedProducts = value.selectedProducts?.$values || [];

      const selectedProductIds = selectedProducts.map((product: any) => product.productId);
      this.applicationForm.patchValue({
        productIds: selectedProductIds
      });
  
      this.selectedProducts= new Set<number>(selectedProductIds)
      selectedProducts.forEach((product:any) => {
          // DebiCheck Products
          const debiCheckProducts = product.debiCheckProducts?.$values || [];
          if (debiCheckProducts.length > 0) {
              const debiCheck = debiCheckProducts[0];
              this.applicationForm.get('debiCheckProducts')?.patchValue({
                  monthlyValue: debiCheck.totalValueMonthly,
                  maximumSingleCollection: debiCheck.maximumSingleCollection,
                  authenticationMechanismsId:debiCheck.authenticationMechanismsId,
                  totalValueMonthly: debiCheck.totalValueMonthly
              });
          }

          // Debit Credit Payments
          const debitCreditPayments = product.debitCreditPayments?.$values || [];
          if (debitCreditPayments.length > 0) {
              const debitCreditPayment = debitCreditPayments[0];
              this.applicationForm.get('debitCreditPayments')?.patchValue({
                  totalMonthlyValue: debitCreditPayment.totalMonthlyValue,
                  averageTransactionalValue: debitCreditPayment.averageTransactionalValue,
                  balanceEnquiryBool: debitCreditPayment.balanceEnquiryBool,
                  budgetFacilityBool: debitCreditPayment.budgetFacilityBool,
                  cashBackatPosBool: debitCreditPayment.cashBackatPosBool,
                  maximumSingleTransactionalValue: debitCreditPayment.maximumSingleTransactionalValue
              });
          }

          // EFT Debits
          const eftDebits = product.eftDebits?.$values || [];
          if (eftDebits.length > 0) {
              const eftDebit = eftDebits[0];
              this.applicationForm.get('eftDebits')?.patchValue({
                  totalValue: eftDebit.totalValue,
                  maximumSingleCollection: eftDebit.maximumSingleCollection
              });
          }

          // AVS
          const avs = product.avs?.$values || [];
          if (avs.length > 0) {
              const avsItem = avs[0];
              this.applicationForm.get('avs')?.patchValue({
                  avsRNumberofRequestsMonthly: avsItem.avsRNumberofRequestsMonthly,
                  numberofRequestsMonthly: avsItem.numberofRequestsMonthly
              });
          }

          // Social Grant EFTs
          const socialGrantEfts = product.socialGrantEfts?.$values || [];
          if (socialGrantEfts.length > 0) {
              const socialGrantEft = socialGrantEfts[0];
              this.applicationForm.get('socialGrantEfts')?.patchValue({
                  monthlyValue: socialGrantEft.monthlyValue
              });
          }

          // AllPS Management Platforms
          const allpsManagementPlatforms = product.allpsManagementPlatforms?.$values || [];
          if (allpsManagementPlatforms.length > 0) {
              const allps = allpsManagementPlatforms[0];
              this.applicationForm.get('allpsManagementPlatforms')?.patchValue({
                  ampId: allps.ampId,
                  expectedMonthlyRequests: allps.expectedMonthlyRequests,
                  feePayableAuthenticationSuccess: allps.feePayableAuthenticationSuccess,
                  feePayableDocumentCollection: allps.feePayableDocumentCollection,
                  automaticExpiration: allps.automaticExpiration,
                  automaticRevoke: allps.automaticRevoke
              });
          }

          const eftcreditDetail= product.eftcreditDetails?.$values || [];
          console.log("eftcreditdetail", product.eftcreditDetails?.$values)
          if (eftcreditDetail.length >0){
            const eft = eftcreditDetail[0];
            this.applicationForm.get('eftcreditDetail')?.patchValue({
              eftcreditDetailId: eft.eftcreditDetailId,
              eftCreditId:eft.eftCreditId,
              ewalletOptionId: eft.ewalletOptionId,
              deliveryAddress:eft.deliveryAddress,
              numberOfCards:eft.numberOfCards,
              numberOfPinMailers:eft.numberOfPinMailers,
            })
          }
      });

      this.legalEntityTypeId=value.legalEntityTypeId;
      
      const eftCreditId = this.applicationForm.get('eftcreditDetail.eftCreditId')?.value;
      
    if (eftCreditId) {
      this.onEftCreditChange();
    }
      console.log("Entity Type:" + value.legalEntityTypeId);
      this.folderId=value.driveLink;
      console.log(this.folderId);
      // Optional: Log form values for debugging


      
      console.log('Form values after patching:', this.applicationForm.value);
      this.applicationStatusId=value.applicationStatusId;
      this.disableFormControls(value.applicationStatusId !== 1);
      console.log("AS " + value.applicationStatusId);
      this.isLoading = false; 
      this.legalDescription= value.legalEntityType.description;
      
   });
}


openCommentsSidebar() {
  if (this.commentSidebar) {
    this.commentSidebar.toggleSidebar();
  }
}  


disableFormControls(disabled: boolean): void {
  Object.keys(this.applicationForm.controls).forEach(controlName => {
    const control = this.applicationForm.get(controlName);
    if (control) {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.disableFormGroupOrArray(control, disabled);
      } else {
        if (disabled) {
          control.disable(); // Disable the control
        } else {
          control.enable(); // Enable the control
        }
      }
    }
  });
}

disableFormGroupOrArray(group: FormGroup | FormArray, disabled: boolean): void {
  Object.keys(group.controls).forEach(controlName => {
    const control = group.get(controlName);
    if (control) {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.disableFormGroupOrArray(control, disabled);
      } else {
        if (disabled) {
          control.disable(); // Disable the control
        } else {
          control.enable(); // Enable the control
        }
      }
    }
  });
}


getCapitecAetAccount(applicationId: number): Promise<void> {
  return new Promise((resolve, reject) => {
    this.dataService.getAccounts(applicationId).subscribe({
      next: (response: any) => {
        const accounts = response.$values;
        this.capitecAetAccount = accounts.find((account: any) => account.aetBool === true);
        resolve();
      },
      error: (error) => {
        console.error('Error fetching accounts', error);
        reject(error);
      }
    });
  });
}

getBackupAccount(applicationId: number): Promise<any> {
  return new Promise((resolve, reject) => {
    this.dataService.getAccounts(applicationId).subscribe({
      next: (response: any) => {
        const accounts = response.$values;
        const backupAccounts = Array.isArray(accounts) 
          ? accounts.filter((account: any) => account.backUpDebitBool === true) 
          : []; // Defaults to an empty array if not

        resolve(backupAccounts);
      },
      error: (error) => {
        console.error('Error fetching accounts', error);
        reject(error);
      }
    });
  });
}


loadProcessingCodes(): void {
  this.dataService.getProcessingCodes(this.applicationId).subscribe((codes:any) => {
    this.populateProcessingCodes(codes.$values);
  });
}




  populateProcessingCodes(processingCodes: any[]): void {
    const processingCodeFormArray = this.applicationForm.get('processingcodes') as FormArray;
    processingCodeFormArray.clear();
  
    processingCodes.forEach((code, index) => {
      const formGroup = this.fb.group({
        pC_TradingName: [code.pC_TradingName],
        landlordName: [code.landlordName],
        landlordNumber: [code.landlordNumber, [Validators.pattern(/^0\d{9}$/)]],
        pcEmailAddress: [code.pcEmailAddress, [Validators.email,emailDomainValidator]],
        managerName: [code.managerName],
        managerNumber: [code.managerNumber, [Validators.pattern(/^0\d{9}$/)]],
        abbreviatedName: [code.abbreviatedName],
        physicalAddress: [code.physicalAddress],
        pcDebtorNumber: [code.pcDebtorNumber, [Validators.pattern(/^0\d{9}$/)]],
        pcDebtorName: [code.pcDebtorName],
        pcDebtorTeleNumber: [code.pcDebtorTeleNumber, [Validators.pattern(/^0\d{9}$/)]],
        pcDebtorEmailAddress: [code.pcDebtorEmailAddress, [Validators.email,emailDomainValidator]],
        debtorManagementSystemId: [code.debtorManagementSystemId],
        accountId: [code.accountId],
        optionId: [code.optionId ], // Load selected option from DB
      });
      processingCodeFormArray.push(formGroup);
  
      // Handle the optionId logic after form group is created
      this.handleOptionChangeAfterLoad(code.optionId, index);
    });
  }
  

  handleOptionChangeAfterLoad(optionId: number, index: number): void {
    const processingCodeFormArray = this.applicationForm.get('processingcodes') as FormArray;
    const formGroup = processingCodeFormArray.at(index);
  
    // If optionId is 1, show Capitec Aet Account info
    if (optionId === 1) {
      this.getCapitecAetAccount(this.applicationId).then(() => {
        if (this.capitecAetAccount) {
          formGroup.patchValue({ accountId: this.capitecAetAccount.accountId });
        }
      });
    }
    // If optionId is 2, fetch the backup account regardless of whether accountId is set
    else if (optionId === 2) {
      const accountId = formGroup.get('accountId')?.value; // Get accountId from the current formGroup
    this.getBackupAccount(this.applicationId).then((backupAccounts) => {
      console.log('Fetched Backup Accounts:', backupAccounts);

      if (Array.isArray(backupAccounts)) {
        const filteredBackupAccount = backupAccounts.find((account: any) => account.accountId === accountId);

        if (filteredBackupAccount) {
          this.newlyAddedAccount[index] = filteredBackupAccount; // Assign to newlyAddedAccount
          formGroup.patchValue({ accountId: filteredBackupAccount.accountId });
        } else {
          this.newlyAddedAccount[index] = null; // No matching backup account, set to null
          formGroup.patchValue({ accountId: null }); // If no matching backup account found, set accountId to null
        }
      } else {
        console.error('backupAccounts is not an array:', backupAccounts);
        this.newlyAddedAccount[index] = null; // Set to null if not an array
        formGroup.patchValue({ accountId: null });
      }
    }).catch((error) => {
      console.error('Error fetching backup accounts', error);
      this.newlyAddedAccount[index] = null; // Handle error case
      formGroup.patchValue({ accountId: null });
    });
    }
    // If optionId is 3, apply previous selection logic
    else if (optionId === 3) {
      this.applyPreviousSelection(index);
    }
  
    formGroup.patchValue({ optionId: optionId }); // Store selected option
  }
  
  ngOnInit(): void {
    this.isLoading = true;
    this.loadRadioOptions();
    this.dataService.getEftCredits().subscribe(data => {
      this.eftCredits = data;
    });
    this.dataService.GetAllIndustryRegulatoryBodies().subscribe({
      next: (bodies) => {
        this.industryRegulatoryBodies = bodies;
      },
      error: (error) => {
        console.error('Error fetching industry regulatory bodies', error);
      }
    });
    console.log('Form Structure:', this.applicationForm);
  //  this.onIndustryRegulatoryBodyChange();
    this.addSupplierReason();
    this.onVatRegisteredChange();
   
    this.applicationId = +this.route.snapshot.paramMap.get('applicationId')!; 
    if (this.applicationId) {
    //  this.loadApplicationData();
      this.populateFormFromAPI(this.applicationId);
    
 
  }
 // console.log(this.driveLink);
    this.dataService.GetAllIdentificationTypes().subscribe({
      next: (types: IdentificationType[]) => {
        this.identificationTypes = types;
      },
      error: (error) => {
        console.error('Error fetching identification types', error);
      }
    });

    this.dataService.GetAllLegalEntityTypes().subscribe({
      next: (types: LegalEntityTypes[]) => {
        this.legalEntityTypes = types;
      },
      error: (error) => {
        console.error('Error fetching legal entity types', error);
      }
    });


    this.dataService.GetAllAlternativeSupplierReasons().subscribe({
      next: (types: AlternativeSupplierReason[]) => {
        this.alternativeSupplierReasons = types;
      },
      error: (error) => {
        console.error('Error fetching legal entity types', error);
      }
    });

    this.loadProcessingCodes();
    this.dataService.GetAllLegalEntityStructures().subscribe({
      next: (types: LegalEntityStructures[]) => {
        this.legalEntityStructures = types;
      },
      error: (error) => {
        console.error('Error fetching legal entity types', error);
      }
    });
    this.dataService.GetAllCollectionTypes().subscribe({
      next: (types) => {
        this.collectionTypes = types;
      },
      error: (error) => {
        console.error('Error fetching collection types', error);
      }
    });
    this.dataService.GetAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Error fetching products', error);
      }
    });
    this.dataService.GetAllAuthenticationMechanisms().subscribe({
      next: (authenticationMechanisms) => {
        this.authenticationMechanisms = authenticationMechanisms;
      },
      error: (error) => {
        console.error('Error fetching products', error);
      }
    });
    this.dataService.GetAllBankNames().subscribe({
      next: (bankNames) => {
        this.banks = bankNames;
      },
      error: (error) => {
        console.error('Error fetching bank names', error);
      }
    });

    this.dataService.GetAllAccountTypes().subscribe({
      next: (accountTypes) => {
        this.accountTypes = accountTypes;
      },
      error: (error) => {
        console.error('Error fetching account types', error);
      }
    });
 
    this.dataService.GetAllMandateTypes().subscribe(data => {
       console.log('MandateTypes', data)
      this.mandateTypes = data;
     },
     error => {
       console.error('Error loading Mandate Types', error);
     });

       this.getRequiredDocs(this.applicationId)
    /*  this.dataService.getRequiredDocuments(this.applicationId).subscribe((response: any) => {
      // Type assertion to inform TypeScript about the response structure
      this.requiredDocuments = response.$values;
      console.log("docs", this.requiredDocuments); 
  });*/

    this.dataService.GetAllDebtorManagementSystems().subscribe(docs => {
      this.debtorManagementSystems = docs;
     
    });
   

   /*  this.dataService.GetLegalEntityType(this.legalEntityTypeId).subscribe((desc:any) => {
      this.entityDescription =desc.description ;
    
    }); */

  }


 
  getRequiredDocs(applicationId:number){
    
    this.dataService.getRequiredDocuments(applicationId).subscribe((response: any) => {
      // Type assertion to inform TypeScript about the response structure
      this.requiredDocuments = response.$values;
      console.log("docs", this.requiredDocuments);
  });
  }

  onEftCreditChange(): void {
    this.selectedEftCreditId = this.applicationForm.get('eftcreditDetail.eftCreditId')?.value;

    if (this.selectedEftCreditId) {
      this.dataService.getEWalletOptions(this.selectedEftCreditId).subscribe(data => {
        this.eWalletOptions = data;
      });
    } else {
      this.eWalletOptions = [];
    }
  }

  onEwalletOptionChange(): void {
    this.selectedEwalletOptionId = this.applicationForm.get('eftcreditDetail.ewalletOptionId')?.value;
  }

  loadRadioOptions(): void {
    this.dataService.GetRadioOptions().subscribe((options:any) => {
      this.radioOptions = options.$values;
      console.log("radio",this.radioOptions)
    });
  }

  loadDependants(dependants: LegalEntityDependant[]): void {
    const dependantFormArray = this.applicationForm.get('legalEntityDependants') as FormArray;
    dependantFormArray.clear();

    dependants.forEach(dependant => {
      dependantFormArray.push(this.fb.group({
        legalEntityDependantId: [dependant.legalEntityDependantId],
        dependantsFullName: [dependant.dependantsFullName],
        dependantsIncomeTaxNumber: [dependant.dependantsIncomeTaxNumber],
        identificationTypeId: [dependant.identificationTypeId]
      }));
    });
    console.log("dependants "+dependantFormArray)
  }

  loadAuthorizedSignatories(signatories: AuthorizedSignatory[]): void {
    const signatoryFormArray = this.applicationForm.get('authorizedSignatories') as FormArray;
    signatoryFormArray.clear();

    signatories.forEach(signatory => {
      signatoryFormArray.push(this.fb.group({
        signatoriesEmailAddress: [signatory.signatoriesEmailAddress],
        signatoriesCapacity: [signatory.signatoriesCapacity],
        signatoriesCellNumber: [signatory.signatoriesCellNumber],
        signatoriesIdentificationNumber: [signatory.signatoriesIdentificationNumber],
        legalDependantBit: [signatory.legalDependantBit],
        signatoriesName:[signatory.signatoriesName],
      }));
    });
  }

  loadShareholders(shareholders: Shareholder[]): void {
    const shareholderFormArray = this.applicationForm.get('shareholders') as FormArray;
    shareholderFormArray.clear();

    shareholders.forEach(shareholder => {
      shareholderFormArray.push(this.fb.group({
        shareholderLegalEntityName: [shareholder.shareholderLegalEntityName],
        legalEntityStructureId: [shareholder.legalEntityStructureId]
      }));
    });
  }

  /* loadProcessingCodes(processingCodes: ProcessingCode[]): void {
    const processingCodeFormArray = this.applicationForm.get('processingcodes') as FormArray;
    processingCodeFormArray.clear();

    processingCodes.forEach(code => {
        processingCodeFormArray.push(this.fb.group({
            pC_TradingName: [code.pC_TradingName],
            landlordName: [code.landlordName],
            landlordNumber: [code.landlordNumber],
            pcEmailAddress: [code.pcEmailAddress],
            managerName: [code.managerName],
            managerNumber: [code.managerNumber],
            abbreviatedName: [code.abbreviatedName],
            physicalAddress: [code.physicalAddress],
            pcDebtorNumber: [code.pcDebtorNumber],
            pcDebtorName: [code.pcDebtorName],
            pcDebtorTeleNumber: [code.pcDebtorTeleNumber],
            pcDebtorEmailAddress: [code.pcDebtorEmailAddress],
            debtorManagementSystemId: [code.debtorManagementSystemId],
            optionId:[code.optionId],
            accountId:[code.accountId],
        }));
    });
}
 */
onCollectionTypeChange(event: IonSelectCustomEvent<any>): void {
  const selectedValues = event.detail.value as number[];
  this.selectedCollectionTypes = new Set<number>(selectedValues);
}

  isCollectionTypeSelected(typeId: number): boolean {
    return this.selectedCollectionTypes.has(typeId);
  }

  getCollectionTypeFormGroup(typeId: number): FormGroup | null {
    switch (typeId) {
      case 1: // DebiCheck
        return this.applicationForm.get('debiCheck') as FormGroup;
      case 2: // EFT
        return this.applicationForm.get('eft') as FormGroup;
      case 3: // SEFT
        return this.applicationForm.get('seft') as FormGroup;
      case 4: // Card Payments
        return this.applicationForm.get('cardPayment') as FormGroup;
      case 5: // Cash
        return this.applicationForm.get('cash') as FormGroup;
      default:
        return null;
    }
  }
  onProductChange(event: IonSelectCustomEvent<any>): void {
    const selectedValues = event.detail.value as number[];
    this.selectedProducts = new Set<number>(selectedValues);
  }
  
  isProductSelected(productId: number): boolean {
    return this.selectedProducts.has(productId);
  }
  
  getProductFormGroup(productId: number): FormGroup | null {
    switch (productId) {
      case 1: // DebiCheck
        return this.applicationForm.get('debiCheckProducts') as FormGroup;
      case 2: // Debit & Credit Card Payments
        return this.applicationForm.get('debitCreditPayments') as FormGroup;
      case 3: // Social Grant EFT Debits
        return this.applicationForm.get('socialGrantEfts') as FormGroup;
      case 4: // EFT Debits
        return this.applicationForm.get('eftDebits') as FormGroup;
      case 5: // AVS/AVS-R
        return this.applicationForm.get('avs') as FormGroup;
      case 8: // ALLPS Management Platform
        return this.applicationForm.get('allpsManagementPlatforms') as FormGroup;
       case 9: // eftCreditDetails
        return this.applicationForm.get('eftcreditDetail') as FormGroup; 
      default:
        return null;
    }
  }
   
  private isSubmitting: boolean = false;

onSubmit(): void {
  if (this.isSubmitting) return;  // Prevent multiple submissions
  this.isSubmitting = true;

  const legalEntityDependants = this.applicationForm.get('legalEntityDependants') as FormArray;
  const allEmpty = legalEntityDependants.controls.every(control => 
    !control.get('dependantsFullName')!.value && 
    !control.get('dependantsIncomeTaxNumber')!.value &&
    !control.get('identificationTypeId')!.value
  );

  if (allEmpty) {
    legalEntityDependants.clear();  // Clear the array if all entries are empty
  }

  if (this.applicationForm.valid) {
    const application: Application = this.transformFormData(this.applicationForm.value);
    application.applicationId = this.applicationId;

    application.existingCollections = Array.from(this.selectedCollectionTypes).map(typeId => {
      const existingCollections: ExistingCollections = {
        existingCollectionsId: 0,
        collectionTypeId: typeId,
        applicationId: this.applicationId,
        application: null,
        cardPayments: typeId === 4 ? [this.applicationForm.get('cardPayment')!.value] : [],
        cashes: typeId === 5 ? [this.applicationForm.get('cash')!.value] : [],
        debiChecks: typeId === 1 ? [this.applicationForm.get('debiCheck')!.value] : [],
        efts: typeId === 2 ? [this.applicationForm.get('eft')!.value] : [],
        sefts: typeId === 3 ? [this.applicationForm.get('seft')!.value] : []
      };
      return existingCollections;
    });

    application.selectedProducts = Array.from(this.selectedProducts).map(productId => {
      const selectedProduct: any = {
        selectedProductId: 0,
        productId: productId,
        applicationId: this.applicationId,
        debiCheckProducts: productId === 1 ? [{
          ...this.applicationForm.get('debiCheckProducts')!.value,
          selectedProductId: 0
        }] : [],
        debitCreditPayments: productId === 2 ? [{
          ...this.applicationForm.get('debitCreditPayments')!.value,
          selectedProductId: 0
        }] : [],
        socialGrantEfts: productId === 3 ? [{
          ...this.applicationForm.get('socialGrantEfts')!.value,
          selectedProductId: 0
        }] : [],
        eftDebits: productId === 4 ? [{
          ...this.applicationForm.get('eftDebits')!.value,
          selectedProductId: 0
        }] : [],
        avs: productId === 5 ? [{
          ...this.applicationForm.get('avs')!.value,
          selectedProductId: 0
        }] : [],
        allpsManagementPlatforms: productId === 8 ? [{
          ...this.applicationForm.get('allpsManagementPlatforms')!.value,
          selectedProductId: 0
        }] : [],
        eftcreditDetail: productId === 9 ? [{
          ...this.applicationForm.get('eftcreditDetail')!.value,
          selectedProductId: 0
        }] : [],

      };
      return selectedProduct;
    });

    const formData = this.applicationForm.value;
    const accountsArray = [
      formData.accountForm1,
      formData.accountForm2,
     
    ];
    const filteredAccounts = accountsArray.filter(account => account.accountHolderName && account.accountNumber);

    const payload = {
      ...formData,
      Accounts: filteredAccounts,
    };
    delete payload.accountForm1;
    delete payload.accountForm2;
   

    console.log("Payload:", payload);
    console.log("Application:", application);

    this.dataService.updateApplication(this.applicationId, payload).subscribe({
      next: (response) => {
        console.log('Application updated successfully', response);
        this.isSubmitting = false;
        this.nextStep();  // Move to the next step after a successful submission
     //   this.getRequiredDocs(this.applicationId)
      },
      error: (error) => {
        console.error('Error updating application', error);
        this.isSubmitting = false;
      }
    });
  } else {
    alert('Please fill all required fields.');
    this.isSubmitting = false;
  }
}

/* nextStep() {
  if (this.stepIndex < 2) { // Adjust according to your number of steps
    this.stepIndex++;
  }
} */
  onStepChange(event: any) {
    this.selectedStep = event.detail.value;
  }

  // Function to go to the next step
  nextStep() {
    if (this.selectedStep < this.steps.length - 1) {
      this.selectedStep++;
    }
  }

  // Function to go to the previous step
  prevStep() {
    if (this.selectedStep > 0) {
      this.selectedStep--;
    }
  }

saveAndContinue() {
  this.onSubmit();
  this.getCapitecAetAccount(this.applicationId);
}


onSaveAndExit(): void {
  if (this.isSubmitting) return;  // Prevent multiple submissions
  this.isSubmitting = true;
  const legalEntityDependants = this.applicationForm.get('legalEntityDependants') as FormArray;
  const allEmpty = legalEntityDependants.controls.every(control => 
    !control.get('dependantsFullName')!.value && 
    !control.get('dependantsIncomeTaxNumber')!.value &&
    !control.get('identificationTypeId')!.value
  );

  if (allEmpty) {
    legalEntityDependants.clear();  // Clear the array if all entries are empty
  }

  if (this.applicationForm.valid) {
    const application: Application = this.transformFormData(this.applicationForm.value);
    application.applicationId = this.applicationId;

    application.existingCollections = Array.from(this.selectedCollectionTypes).map(typeId => {
      const existingCollections: ExistingCollections = {
        existingCollectionsId: 0,
        collectionTypeId: typeId,
        applicationId: this.applicationId,
        application: null,
        cardPayments: typeId === 4 ? [this.applicationForm.get('cardPayment')!.value] : [],
        cashes: typeId === 5 ? [this.applicationForm.get('cash')!.value] : [],
        debiChecks: typeId === 1 ? [this.applicationForm.get('debiCheck')!.value] : [],
        efts: typeId === 2 ? [this.applicationForm.get('eft')!.value] : [],
        sefts: typeId === 3 ? [this.applicationForm.get('seft')!.value] : []
      };
      return existingCollections;
    });

    application.selectedProducts = Array.from(this.selectedProducts).map(productId => {
      const selectedProduct: any = {
        selectedProductId: 0,
        productId: productId,
        applicationId: this.applicationId,
        debiCheckProducts: productId === 1 ? [{
          ...this.applicationForm.get('debiCheckProducts')!.value,
          selectedProductId: 0
        }] : [],
        debitCreditPayments: productId === 2 ? [{
          ...this.applicationForm.get('debitCreditPayments')!.value,
          selectedProductId: 0
        }] : [],
        socialGrantEfts: productId === 3 ? [{
          ...this.applicationForm.get('socialGrantEfts')!.value,
          selectedProductId: 0
        }] : [],
        eftDebits: productId === 4 ? [{
          ...this.applicationForm.get('eftDebits')!.value,
          selectedProductId: 0
        }] : [],
        avs: productId === 5 ? [{
          ...this.applicationForm.get('avs')!.value,
          selectedProductId: 0
        }] : [],
        allpsManagementPlatforms: productId === 8 ? [{
          ...this.applicationForm.get('allpsManagementPlatforms')!.value,
          selectedProductId: 0
        }] : [],
        eftcreditDetail: productId === 9 ? [{
          ...this.applicationForm.get('eftcreditDetail')!.value,
          selectedProductId: 0
        }] : [],

      };
      return selectedProduct;
    });

    const formData = this.applicationForm.value;
    const accountsArray = [
      formData.accountForm1,
      formData.accountForm2,
    
    ];
    const filteredAccounts = accountsArray.filter(account => account.accountHolderName && account.accountNumber);

    const payload = {
      ...formData,
      Accounts: filteredAccounts,
    };
    delete payload.accountForm1;
    delete payload.accountForm2;
   
    console.log("Payload:", payload);
    console.log("Application:", application);

    this.dataService.updateApplication(this.applicationId, payload).subscribe({
      next: (response) => {
        console.log('Application updated successfully', response);
        this.isSubmitting = false;
        // Redirect to the home page or another route after saving
        this.navCtrl.navigateRoot('/tabs/home');
      },
      error: (error) => {
        console.error('Error updating application', error);
        this.isSubmitting = false;
      }
    });
  } else {
    alert('Please fill all required fields.');
    this.isSubmitting = false;
  }
}

onFinalSubmit(): void {
  if (this.applicationForm.valid) {
    this.dataService.clientSubmit(this.applicationId).subscribe({
      next: (response) => {
        console.log('Application submitted successfully', response);
      /*  this.snackBar.open('Your application has been submitted successfully!', 'Close', {
          duration: 3000, // Duration in milliseconds
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        this.router.navigate(['/secondapplicant']);*/
      },
      error: (errorResponse) => {
        if (errorResponse.error && errorResponse.error.message === 'The following values are missing or incomplete:') {
          this.errorMessage = errorResponse.error.message;
          this.missingValues = errorResponse.error.missingValues.$values;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
          this.missingValues = [];
        }
      }
    });
  } else {
  /*  this.snackBar.open('Please fill all required fields.', 'Close', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });*/
  }
}



  addDependant(): void {
    const dependantFormArray = this.applicationForm.get('legalEntityDependants') as FormArray;
    dependantFormArray.push(this.fb.group({
      legalEntityDependantId: [0], // Default value for new dependants
      dependantsFullName: [''],
      dependantsIncomeTaxNumber: ['',[Validators.pattern(/^\d{10}$/)]],
      identificationTypeId: null
    }));
  }
  private createDependantGroup(): FormGroup {
    return this.fb.group({
      legalEntityDependantId: [0], // Default value for new dependants
      dependantsFullName: [''],
      dependantsIncomeTaxNumber: ['', [Validators.pattern(/^\d{10}$/)]],
      identificationTypeId: ['']
    });
  }

  removeDependant(index: number): void {
    const dependantFormArray = this.applicationForm.get('legalEntityDependants') as FormArray;
    dependantFormArray.removeAt(index);
  }

  addAuthorizedSignatory(): void {
    const signatoryFormArray = this.applicationForm.get('authorizedSignatories') as FormArray;
    if (signatoryFormArray.length < 2) {
      signatoryFormArray.push(this.fb.group({
        signatoriesEmailAddress: ['', [Validators.email,emailDomainValidator]],
        signatoriesCapacity: [''],
        signatoriesCellNumber: ['',[Validators.pattern(/^0\d{9}$/)]],
        signatoriesIdentificationNumber: ['',[Validators.pattern(/^\d{13}$/)]],
        legalDependantBit: [null],
        signatoriesName: [],
      }));
    }
  }

  removeAuthorizedSignatory(index: number): void {
    const signatoryFormArray = this.applicationForm.get('authorizedSignatories') as FormArray;
    signatoryFormArray.removeAt(index);
  }

  addShareholder(): void {
    const shareholderFormArray = this.applicationForm.get('shareholders') as FormArray;
    shareholderFormArray.push(this.fb.group({
      shareholderLegalEntityName: [''],
      legalEntityStructureId: ['']
    }));
  }

  removeShareholder(index: number): void {
    const shareholderFormArray = this.applicationForm.get('shareholders') as FormArray;
    shareholderFormArray.removeAt(index);
  }


  addProcessingCode(): void {
    this.dataService.getAccounts(this.applicationId).subscribe((accounts) => {
      this.accounts = accounts;
    });
    const processingCodeFormArray = this.applicationForm.get('processingcodes') as FormArray;
    processingCodeFormArray.push(this.fb.group({
        pC_TradingName: [''],
        landlordName: [''],
        landlordNumber: ['',[Validators.pattern(/^0\d{9}$/)]],
        pcEmailAddress: ['',[Validators.email,emailDomainValidator]],
        managerName: [''],
        managerNumber: ['',[Validators.pattern(/^0\d{9}$/)]],
        abbreviatedName: ['',[Validators.pattern(/^[a-zA-Z]{1,8}$/)]],
        physicalAddress: [''],
        pcDebtorNumber: ['',[Validators.pattern(/^0\d{9}$/)]],
        pcDebtorName: [''],
        pcDebtorTeleNumber: ['',[Validators.pattern(/^0\d{9}$/)]],
        pcDebtorEmailAddress: ['',[Validators.email,emailDomainValidator]],
        debtorManagementSystemId: null,
        accountId:null,
        optionId:null,
    }));
}

removeProcessingCode(index: number): void {
    const processingCodeFormArray = this.applicationForm.get('processingcodes') as FormArray;
    processingCodeFormArray.removeAt(index);
}
/* 
onProcessingCodeAddressSelected(event: any, index: number): void {
  const place: PlaceResult = event as PlaceResult;
  this.processingcodes.at(index).patchValue({ physicalAddress: place.formatted_address });
} */

/* onRadioButtonChange(option: string, index:number): void {
  if (option === 'selectCapitecAet') {
    this.getCapitecAetAccount(this.applicationId).then(() => {
      this.showAccountForm = false;
      if (this.capitecAetAccount) {
        console.log('Selected Account ID:', this.capitecAetAccount.accountId);
        this.processingcodes.at(index).patchValue({ 
          accountId: this.capitecAetAccount.accountId,
        
        });
      }
    });
  } else if (option === 'addNewAccount') {
    // Show form to add new account
    this.showAccountForm = true;
  }
} */

// // Add new account
// addNewAccount(index:number): void {
//   if (this.accountForm.valid) {
//     this.dataService.addBackupAccount(this.accountForm.value).subscribe({
//       next: (newAccount) => {
//         // Display newly added account in text format
//         console.log('New account added:', newAccount);
//         this.showAccountForm = false;
//        this.capitecAetAccount=false
//         this.newlyAddedAccount = newAccount;
//         // Update processing code with the newly added account ID
//         this.processingcodes.at(index).patchValue({ 
//           accountId: newAccount.accountId
        
//         });
//         console.log(newAccount.accountId)
     
//       },
//       error: (error) => {
//         console.error('Error adding new account', error);
//       }
//     });
//   }
// }
getBankName(bankNameId: number): string {
  const bank = this.banks.find(b => b.bankNameId === bankNameId);
  return bank ? bank.description : 'Unknown';
}

// Function to get account type by accountTypeId
getAccountType(accountTypeId: number): string {
  const accountType = this.accountTypes.find(at => at.accountTypeId === accountTypeId);
  return accountType ? accountType.description : 'Unknown';
}
get accountForm1() {
  return this.applicationForm.get('accountForm1') as FormGroup;
}
get accountForm2() {
  return this.applicationForm.get('accountForm2') as FormGroup;
}
get otherSupplierReasons(): FormArray {
  return this.applicationForm.get('otherSupplierReasons') as FormArray;
}
  get legalEntityDependants(): FormArray {
    return this.applicationForm.get('legalEntityDependants') as FormArray;
  }

  get authorizedSignatories(): FormArray {
    return this.applicationForm.get('authorizedSignatories') as FormArray;
  }

  get shareholders(): FormArray {
    return this.applicationForm.get('shareholders') as FormArray;
  }

  get processingcodes(): FormArray {
    return this.applicationForm.get('processingcodes') as FormArray;
}


/* 
onAccountOptionChange(index: number): void {
  const processingCodeFormGroup = (this.applicationForm.get('processingcodes') as FormArray).at(index);

  if (processingCodeFormGroup.get('selectedAccountOption')?.value === 'newAccount') {
      // Clear existing account selection and ensure backupBool is true for the new account
      processingCodeFormGroup.get('newAccount.backUpDebitBool')?.setValue(true);
  }
} */

  // onRadioButtonChange(option: string, index: number): void {
  //   if (optionId === 1) {
  //     this.getCapitecAetAccount(this.applicationId).then(() => {
        
  //       if (this.capitecAetAccount) {
  //         this.processingcodes.at(index).patchValue({ accountId: this.capitecAetAccount.accountId });
  //       }
  //     });
  //   } else if (optionId === 2) {
     
  //   } else if (optionId === 3) {
  //     // Handle Same as Previous Selection
  //     const previousOptionId = this.getPreviousSelection(); // Implement logic to get previous selection
  //     this.onRadioButtonChange(previousOptionId, index);
  //   }

  //   // Store the selected option in the form group
  //   this.processingcodes.at(index).patchValue({ optionId: optionId });
  // }
  getOptionControl(processingCode: AbstractControl): FormControl {
    return processingCode.get('optionId') as FormControl;
  }
  

  onRadioButtonChange(option: number, index: number): void {
    const processingCodeFormArray = this.applicationForm.get('processingcodes') as FormArray;
    const formGroup = processingCodeFormArray.at(index);

    if (option === 1) {
      this.getCapitecAetAccount(this.applicationId).then(() => {
        if (this.capitecAetAccount) {
          formGroup.patchValue({ accountId: this.capitecAetAccount.accountId });
         
        }
      });
    } else if (option === 2) {
      formGroup.patchValue({ accountId: null });
    } else if (option === 3) {
     
      this.applyPreviousSelection(index)
    }

    formGroup.patchValue({ optionId: option }); // Store selected option
  }

  addNewAccount(index: number): void {
    console.log("yes")
    if (this.accountForm.valid) {
      const accountFormData = {
        ...this.accountForm.value,
        applicationId: this.applicationId // Assuming you have `applicationId` in your component
      };
      this.dataService.addBackupAccount(accountFormData).subscribe((newAccount) => {
        this.newlyAddedAccount[index] = newAccount;
        this.showAccountForm = false;
        this.processingcodes.at(index).patchValue({ accountId: newAccount.accountId , optionId:2});
        this.previousAccount = this.newlyAddedAccount;
      });
    }
  }
  applyPreviousSelection(index: number): void {
    if (index === 0) return; // No previous selection for the first item

  const previousFormGroup = (this.applicationForm.get('processingcodes') as FormArray).at(index - 1);
  const previousAccountId = previousFormGroup?.get('accountId')?.value;
  console.log("previousAccountId ",previousAccountId);
  const previousSelectedOption = previousFormGroup?.get('optionId')?.value;

  this.dataService.getAccounts(this.applicationId).subscribe({
    next: (response: any) => {
      const accounts = response.$values;
      this.previousAccount[index] = accounts.find((account: any) => account.accountId === previousAccountId);

      // If the previousAccount is found, patch the form group
      if (this.previousAccount) {
        const formGroup = (this.applicationForm.get('processingcodes') as FormArray).at(index);
        formGroup.patchValue({
          accountId: previousAccountId,
          optionId: 3 // Carry over the previous selection
        });
      }
    }
  });
  }

  getPreviousFormGroup(index: number): FormGroup | null {
    const processingCodeFormArray = this.applicationForm.get('processingcodes') as FormArray;
    return index > 0 ? processingCodeFormArray.at(index - 1) as FormGroup : null;
  }
 
  get fileInput(): HTMLInputElement {
    return document.getElementById('fileInput') as HTMLInputElement;
  }

  onFileSelected(event: Event, docId: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(input.files, docId);
    }
  }
  addFiles(files: FileList, docId: number): void {
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push({
        file: files[i],
        name: files[i].name,
        progress: 0,
        uploading: false,
        link: undefined,
        docId: docId
      });
    }
  }

 /*  uploadFile(file: UploadFile): void {
    file.uploading = true;
    if (this.folderId) {
      const formData = new FormData();
      formData.append('file', file.file);
      formData.append('folderId', this.folderId);

      this.dataService.uploadFile(formData).subscribe(
        response => {
          file.uploading = false;
          file.progress = 100;
          file.link = response.link;

          if (file.docId !== undefined && file.link !== undefined) {
            this.saveSubmittedDocumentLink(file.docId, file.link);
            file.uploaded = true;
          } else {
            console.error('Could not save file, folder Id and doc Id undefined');
          }
        },
        error => {
          console.error('Error uploading file:', error);
          alert('Error uploading file:' + error);
          file.uploading = false;
        }
      );
    }
  } */

    async takePicture(docId: number) {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });
    
      // Convert the image file to a File instead of Blob
      const blob = await fetch(image.webPath!).then(res => res.blob());
    
      // Create a File from the Blob
      const file = new File([blob], `photo-${docId}-${Date.now()}.jpg`, {
        type: blob.type,
        lastModified: Date.now()
      });
    
      const uploadFile: UploadFile = {
        docId,
        file,  // Now this is a File, not a Blob
        name: file.name,
        uploading: false,
        progress: 0,
        uploaded: false
      };
    
      this.selectedFiles.push(uploadFile);
    }
    

    uploadFile(file: UploadFile): void {
      file.uploading = true;
    
      if (this.folderId) {
        const formData = new FormData();
        formData.append('file', file.file);
        formData.append('folderId', this.folderId);
    
        this.dataService.uploadFile(formData).subscribe(
          response => {
            file.uploading = false;
            file.progress = 100;
            file.link = response.link;
    
            if (file.docId !== undefined && file.link !== undefined) {
              this.saveSubmittedDocumentLink(file.docId, file.link);
              file.uploaded = true;
            } else {
              console.error('Could not save file, folder Id and doc Id undefined');
            }
          },
          error => {
            file.uploading = false;
    
            // Extract and display user-friendly error message
            const errorMessage = this.getUserFriendlyError(error.error);
            console.error('Error uploading file:', errorMessage);
            alert(errorMessage);
          }
        );
      } else {
        console.error('folderId is undefined, cannot upload file');
        alert('Cannot upload file: Folder ID is missing.');
        file.uploading = false;
      }
    }
    
    // Function to map technical errors to user-friendly messages
    getUserFriendlyError(errorHtml: string): string {
      const defaultMessage = 'An error occurred during the upload. Please try again.';
    
      // Parse HTML to extract the error message
      const parser = new DOMParser();
      const doc = parser.parseFromString(errorHtml, 'text/html');
      const preTag = doc.querySelector('pre');
    
      if (preTag) {
        const rawErrorMessage = preTag.textContent?.trim();
    
        if (rawErrorMessage) {
          // Simplified error mapping based on known error patterns
          if (rawErrorMessage.includes('Invalid file type')) {
            return 'Invalid file type. Please upload only images, documents, or PDFs.';
          } else if (rawErrorMessage.includes('File size exceeds')) {
            return 'File size exceeds the 15MB limit. Please upload a smaller file.';
          } else {
            return defaultMessage;
          }
        }
      }
    
      return defaultMessage;
    }
    
    

  saveSubmittedDocumentLink(docId: number, link: string): void {
    const submittedDocument = {
      applicationRequiredDocumentId: docId,
      document: link,
      submissionDateTime: new Date()
    };

    this.dataService.saveSubmittedDocument(submittedDocument).subscribe(
      response => {
        console.log('Link saved successfully:', response);
      },
      error => {
        console.error('Error saving link:', error);
      }
    );
  }


  deleteFile(fileId: string): void {
    this.dataService.deleteFile(fileId).subscribe(() => {
      console.log('File deleted successfully');
      // Optionally refresh the file list or show a success message
    });
  }

  removeFile(index: number,): void {
    const file = this.selectedFiles[index];
 
    if (file.uploaded) {
      if (confirm('Are you sure you want to delete this document?')) {
        if (file.link) {
          // Extract Google Drive Document ID from the link
          const googleDriveDocId = file.link.split('/d/')[1]?.split('/')[0];
          this.dataService.ClientdeleteSubmittedDocument(file?.link).subscribe({
            next: (response) => {
              
           
            },
            error: (error) => {
              alert(error.message);
            },
          });  
          if (googleDriveDocId) {
            this.dataService.deleteFile(googleDriveDocId).subscribe(
              response => {
                if (response) {
                  // Check for success key in the response
                  if (response.success) {
                    this.selectedFiles.splice(index, 1);
                    this.getRequiredDocs(this.applicationId)
                    //delete from api
                 
                  } else {
                    alert('Failed to delete the file. Please try again.');
                  }
                } else {
                  alert('No response received from the server.');
                }
              },
              (error) => {
                console.error('Error deleting file:', error);
                alert('Failed to delete the file. Please try again.'); // Error message
              }
            );
          } else {
            console.error('Google Drive document ID is undefined, cannot delete file');
            alert('Failed to delete the file. Document ID is missing.');
          }
        } else {
          alert('File link is missing. Cannot delete the file.');
        }
      }
    } else {
      if (confirm('Are you sure you want to cancel this upload?')) {
        this.selectedFiles.splice(index, 1);
        alert('Upload cancelled.'); // Message for cancelling the upload
      }
    }
  }



  goBack(): void {
  this.navCtrl.back();
}
 /* later
  openAssist(page: string): void {
    this.assistService.getAssistContent(page).subscribe(content => {
      this.dialog.open(AssistModalComponent, {
        data: content
      });
    });
  }
 */
  hasPendingUploads(): boolean {
    return this.selectedFiles.some(file => !file.uploaded);
  }
  uploadAll(): void {
    this.selectedFiles.forEach(file => {
      if (!file.uploading) {
        if (!file.uploaded){
          this.uploadFile(file);
        }
      }
    });
  }

  removeAll(): void {
    if (confirm('Are you sure you want to cancel all uploads?')) {
      this.selectedFiles = [];
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer?.files) {
      this.addFiles(event.dataTransfer.files, 0); // Use appropriate docId
    }
  }}