import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { Consultant, RequiredDocument } from './model';
import { IndustryRegulatoryBody } from './model';
import { IdentificationType } from './model';
import { LegalEntityTypes } from './model';
import { LegalEntityStructures } from './model';
import { MandateTypes } from './model';
import { CollectionType } from './model';
import { AlternativeSupplierReason } from './model';
import { BankName } from './model';
import { AccountType } from './model';
import { DebtorManagementSystem } from './model';
import { Product } from './model';
import { AuthenticationMechanisms } from './model';
import { ApplicationStatus } from './model';  
import { catchError } from 'rxjs';
import { Login } from './model';
import { User } from './model';
import { Client } from './model';
import { Application } from './model';
import { RegisterClient } from './model';
import { SaveLinkDTO } from './model';
import { Employee } from './model';


@Injectable({
  providedIn: 'root'
})
export class DataService {
apiUrl = 'https://ampliflowapi-b3bub4c0d8g6cgg8.southafricanorth-01.azurewebsites.net/api/'

httpOptions ={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

constructor(private httpClient: HttpClient) { }

//Account Type
GetAllAccountTypes(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}CRUD/GetAllAccountTypes`)
  .pipe(map(result => result))
}

addAccountType(description: string): Observable<any> {
  const params = new HttpParams().set('Description', description);
  return this.httpClient.post<AccountType>(`${this.apiUrl}CRUD/AddAccountType`, null, {params})
  .pipe(map(result => result))
}
 

getAccountTypeId(accountTypeId: string): Observable<AccountType>{
  return this.httpClient.get<AccountType>(`${this.apiUrl}CRUD/GetAccountTypes/` + accountTypeId)
}

updateAccountType(id: number, description: string): Observable<AccountType>{
  const url = `${this.apiUrl}CRUD/UpdateAccountType/${id}?Description= ${description}`;
    return this.httpClient.put<AccountType>(url, {}); 
  }

deleteAccountType(accountTypeId: number): Observable<AccountType>{
  return this.httpClient.delete<AccountType>(`${this.apiUrl}CRUD/DeleteAccountType/` + accountTypeId)
}

//Supplier Reasons

GetAllAlternativeSupplierReasons(): Observable<any[]>{
  return this.httpClient.get<any[]>(`${this.apiUrl}CRUD/GetAllAlternativeSupplierReasons`)
  .pipe(map(result => result))
}

addAlternativeSupplierReason(description: string): Observable<any> {
  const params = new HttpParams().set('Description', description);
  return this.httpClient.post<any>(`${this.apiUrl}CRUD/AddAlternativeSupplierReason`, null, { params })
    .pipe(map(result => result));
}

getAlternativeSupplierReasonId(alternativeSupplierId: string): Observable<AlternativeSupplierReason>{
  return this.httpClient.get<AlternativeSupplierReason>(`${this.apiUrl}CRUD/GetAlternativeSupplierReasons/` + alternativeSupplierId)
}


updateAlternativeSupplierReason(id: number, description: string): Observable<AlternativeSupplierReason> {
  const url = `${this.apiUrl}CRUD/UpdateAlternativeSupplierReason/${id}?Description=${encodeURIComponent(description)}`;
  return this.httpClient.put<AlternativeSupplierReason>(url, {})
    .pipe(
      catchError(this.handleError)
    );
}

private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // Return an observable with a user-facing error message.
  return throwError('Something bad happened; please try again later.');
}

deleteAlternativeSupplierReason(alternativeSupplierId: number): Observable<AlternativeSupplierReason> {
  const url = `${this.apiUrl}CRUD/DeleteAlternativeSupplierReason/${alternativeSupplierId}`;
  console.log(`DELETE request to: ${url}`);
  return this.httpClient.delete<AlternativeSupplierReason>(url)
    .pipe(
      catchError(this.handleHttpError) // Using handleHttpError method here
    );
}

private handleHttpError(error: HttpErrorResponse): Observable<never> {
  console.error('An error occurred:', error.message);
  return throwError('Something bad happened; please try again later.');
}





//Application Status

GetAllApplicationStatus(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}CRUD/GetAllApplicationStatus`)
  .pipe(map(result => result))
}

addAllApplicationStatus(addApplicationStatusAtt: ApplicationStatus){
  return this.httpClient.post<ApplicationStatus>(`${this.apiUrl}CRUD/AddApplicationStatus`, addApplicationStatusAtt)
  .pipe(map(result => result))
}

getAllApplicationStatusId(applicationStatusId: string): Observable<ApplicationStatus>{
  return this.httpClient.get<ApplicationStatus>(`${this.apiUrl}CRUD/GetApplicationStatus/` + applicationStatusId)
}

updateApplicationStatus(id: number, applicationStatusAtt: ApplicationStatus): Observable<ApplicationStatus>{
  return this.httpClient.put<ApplicationStatus>(`${this.apiUrl}CRUD/UpdateApplicationStatus/` + id, applicationStatusAtt)
}

deleteApplicationStatus(applicationStatusId: number): Observable<ApplicationStatus>{
  return this.httpClient.delete<ApplicationStatus>(`${this.apiUrl}CRUD/DeleteApplicationStatus/` + applicationStatusId)
}

//Mechanisms

GetAllAuthenticationMechanisms(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}CRUD/GetAllAuthenticationMechanisms`)
  .pipe(map(result => result))
}

addAuthenticationMechanisms(description: string): Observable<any> {
  const params = new HttpParams().set('Description', description);
  return this.httpClient.post(`${this.apiUrl}CRUD/AddAuthenticationMechanism`, null, { params })
    .pipe(map(result => result));
}




getAuthenticationMechanismsId(authenticationMechanismsId: string): Observable<AuthenticationMechanisms>{
  return this.httpClient.get<AuthenticationMechanisms>(`${this.apiUrl}CRUD/GetAuthenticationMechanism/` + authenticationMechanismsId)
}

updateAuthenticationMechanisms(id: number, description: string): Observable<AuthenticationMechanisms> {
  // Properly encode the description for URL
  const encodedDescription = encodeURIComponent(description);
  const url = `${this.apiUrl}CRUD/UpdateAuthenticationMechanism/${id}?Description=${encodedDescription}`;
  return this.httpClient.put<AuthenticationMechanisms>(url, {});
}


deleteAuthenticationMechanisms(authenticationMechanismsId: number): Observable<AuthenticationMechanisms>{
  return this.httpClient.delete<AuthenticationMechanisms>(`${this.apiUrl}CRUD/DeleteAuthenticationMechanism/` + authenticationMechanismsId)
}

//Bank

GetAllBankNames(): Observable<any> {
  return this.httpClient.get(`${this.apiUrl}CRUD/GetAllBankNames`)
    .pipe(map(result => result));
}

addBankName(description: string): Observable<any> {
  const params = new HttpParams().set('Description', description);
  return this.httpClient.post<BankName>(`${this.apiUrl}CRUD/AddBankName`, null, { params })
    .pipe(map(result => result));
}
 
getBankNameId(bankId: string): Observable<BankName>{
  return this.httpClient.get<BankName>(`${this.apiUrl}CRUD/GetBankName/` + bankId)
}

updateBankName(id: number, description: string): Observable<BankName> {
  const url = `${this.apiUrl}CRUD/UpdateBankName/${id}?Description=${encodeURIComponent(description)}`;
  return this.httpClient.put<BankName>(url, {});
}

deleteBankName(bankId: number): Observable<BankName>{
  return this.httpClient.delete<BankName>(`${this.apiUrl}CRUD/DeleteBankName/` + bankId)
}

//Collection Type

GetAllCollectionTypes(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}CRUD/GetAllCollectionTypes`)
  .pipe(map(result => result))
}

//Debtor Management System

GetAllDebtorManagementSystems(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}CRUD/GetAllDebtorManagementSystems`)
  .pipe(map(result => result))
}

addDebtorManagementSystem(description: string): Observable<DebtorManagementSystem> {
  const params = new HttpParams().set('Description', description);
  return this.httpClient.post<DebtorManagementSystem>(`${this.apiUrl}CRUD/AddDebtorManagementSystem`, null, { params })
    .pipe(map(result => result));
}


getDebtorManagementSystemId(debtorManagementId: string): Observable<DebtorManagementSystem>{
  return this.httpClient.get<DebtorManagementSystem>(`${this.apiUrl}CRUD/GetDebtorManagementSystem/` + debtorManagementId)
}

updateDebtorManagementSystem(id: number, description: string): Observable<DebtorManagementSystem> {
  const encodedDescription = encodeURIComponent(description);
  const url = `${this.apiUrl}CRUD/UpdateDebtorManagementSystem/${id}?Description=${encodedDescription}`;
  return this.httpClient.put<DebtorManagementSystem>(url, {});
}



deleteDebtorManagementSystem(id: number): Observable<any> {
  const url = `${this.apiUrl}CRUD/DeleteDebtorManagementSystem/${id}`;
  return this.httpClient.delete(url);
}






//Identification 

GetAllIdentificationTypes(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}CRUD/GetAllIdentificationTypes`)
  .pipe(map(result => result))
}

addIdentificationType(description: string): Observable<any> {
  const params = new HttpParams().set('Description', description);
   return this.httpClient.post<IdentificationType>(`${this.apiUrl}CRUD/AddIdentificationType`, null, {params})
   .pipe(map(result => result));
 }

getIdentificationTypeId(identificationTypeId: string): Observable<IdentificationType>{
  return this.httpClient.get<IdentificationType>(`${this.apiUrl}CRUD/GetIdentificationType/` + identificationTypeId)
}

updateIdentificationType(id: number, description: string): Observable<IdentificationType> {
  // Properly encode the description for URL
  const encodedDescription = encodeURIComponent(description);
  const url = `${this.apiUrl}CRUD/UpdateIdentificationType/${id}?Description=${encodedDescription}`;
  return this.httpClient.put<IdentificationType>(url, {});
}

    

deleteIdentificationType(identificationTypeId: number): Observable<IdentificationType>{
  return this.httpClient.delete<IdentificationType>(`${this.apiUrl}CRUD/DeleteIdentificationType/` + identificationTypeId)
}

// Industry Regulatory Body

GetAllIndustryRegulatoryBodies(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}CRUD/GetIndustryRegulartoryBodies`)
  .pipe(map(result => result))
}

addIndustryRegulatoryBody(industryRegulatoryBody: IndustryRegulatoryBody): Observable<any> {
  const params = new HttpParams().set('Description', industryRegulatoryBody.description);
  return this.httpClient.post<any>(`${this.apiUrl}CRUD/AddIndustryRegulartoryBody`, null, { params })
    .pipe(map(result => result));
}


getIndustryRegulatoryBodyId(getIndustryRegulatoryBodyId: string): Observable<IndustryRegulatoryBody>{
  return this.httpClient.get<IndustryRegulatoryBody>(`${this.apiUrl}CRUD/GetIndustryRegulatoryBody/` + getIndustryRegulatoryBodyId)
}

updateIndustryRegulatoryBody(id: number, description: string): Observable<IndustryRegulatoryBody> {
  const baseUrl = this.apiUrl.endsWith('/') ? this.apiUrl.slice(0, -1) : this.apiUrl;
  const url = `${baseUrl}/CRUD/UpdateIndustryRegulartoryBody/${id}?Description=${description}`;
  console.log('Request URL:', url); // Debugging URL
  return this.httpClient.put<IndustryRegulatoryBody>(url, {}).pipe(
      catchError((error: HttpErrorResponse) => {
          console.error('Error in HTTP request', error); // Log the error
          return throwError(error);
      })
  );
}

deleteIndustryRegulatoryBody(id: number): Observable<IndustryRegulatoryBody> {
  const url = `${this.apiUrl}CRUD/DeleteIndustryRegulartoryBody/${id}`;
  console.log(`DELETE request URL: ${url}`); // Log URL for debugging
  return this.httpClient.delete<IndustryRegulatoryBody>(url);
}




//Legal Entity

GetAllLegalEntityStructures(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}CRUD/GetAllLegalEntityStructures`)
  .pipe(map(result => result))
}

GetLegalEntityStructure(id :number): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}CRUD/GetLegalEntityStructure/${id}`)
  .pipe(map(result => result))
}

GetAllLegalEntityTypes(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}CRUD/GetAllLegalEntityTypes`)
  .pipe(map(result => result))
}

GetLegalEntityType(id :number): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}CRUD/GetLegalEntityType/${id}`)
  .pipe(map(result => result))
}

addLegalEntityType(description: string): Observable<any> {
  const params = new HttpParams().set('Description', description);

  return this.httpClient.post(`${this.apiUrl}CRUD/AddLegalEntityType`, null, { params })
    .pipe(map(result => result));
}



updateLegalEntityType(id: number, description: string): Observable<LegalEntityTypes> {
  const encodedDescription = encodeURIComponent(description);
  const url = `${this.apiUrl}CRUD/UpdateLegalEntityType/${id}?Description=${encodedDescription}`;
  return this.httpClient.put<LegalEntityTypes>(url, {});
}



deleteLegalEntityType(legalEntityTypeId: number): Observable<LegalEntityTypes> {
  return this.httpClient.delete<LegalEntityTypes>(`${this.apiUrl}CRUD/DeleteLegalEntityType/` + legalEntityTypeId)
  }
  


GetAllMandateTypes(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}CRUD/GetAllMandateTypes`)
  .pipe(map(result => result))
}

GetAllProducts(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}CRUD/GetAllProducts`)
  .pipe(map(result => result))
}



// Required Documents
GetAllRequiredDocuments(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}CRUD/GetAllRequiredDocuments`)
  .pipe(map(result => result))
}

addRequiredDocument(description: string): Observable<any> {
  const params = new HttpParams().set('Description', description);
  return this.httpClient.post<RequiredDocument>(`${this.apiUrl}CRUD/AddRequiredDocument`, null, { params })
    .pipe(map(result => result));
}


getRequiredDocumentId(requiredDocumentId: string): Observable<RequiredDocument>{
  return this.httpClient.get<RequiredDocument>(`${this.apiUrl}CRUD/GetRequiredDocument/` + requiredDocumentId)
}

updateRequiredDocument(id: number, description: string): Observable<RequiredDocument> {
  const url = `${this.apiUrl}CRUD/UpdateRequiredDocument/${id}?Description=${description}`;
  return this.httpClient.put<RequiredDocument>(url, {});
}

deleteRequiredDocument(requiredDocumentId: number): Observable<RequiredDocument>{
  return this.httpClient.delete<RequiredDocument>(`${this.apiUrl}CRUD/DeleteRequiredDocument/` + requiredDocumentId)
}

getComments(applicationId: number): Observable<any> {
  return this.httpClient.get<any>(`${this.apiUrl}Application/GetComments/${applicationId}`);
}
addComment(comment: any): Observable<any> {
  return this.httpClient.post<any>(`${this.apiUrl}Application/Comment`, comment);
}

GetApplications(): Observable<Application[]> {
  return this.httpClient.get<Application[]>(`${this.apiUrl}Application/GetAllApplications`)
    .pipe(map(result => result));
}

GetApplicationsDto(): Observable<Application[]> {
  return this.httpClient.get<Application[]>(`${this.apiUrl}Application/GetAllApplicationsDto`)
    .pipe(map(result => result));
}

GetMyApplication(): Observable<Application[]> {
  return this.httpClient.get<Application[]>(`${this.apiUrl}Application/GetMyApplications`)
    .pipe(map(result => result));
}
GetMyClientsApplications(): Observable<Application[]> {
  return this.httpClient.get<Application[]>(`${this.apiUrl}Application/GetMyClientsApplications`)
    .pipe(map(result => result));
}

GetClientApplications(applicantId:number): Observable<Application[]> {
  return this.httpClient.get<Application[]>(`${this.apiUrl}Application/GetClientApplications/${applicantId}`,{})
    .pipe(map(result => result));
}

consultantSubmit(applicationId: number): Observable<any> {
  return this.httpClient.put<any>(`${this.apiUrl}Application/ConsultantSubmit/${applicationId}`, {});
}

// Method to return the application
consultantReturn(applicationId: number): Observable<any> {
  return this.httpClient.put<any>(`${this.apiUrl}Application/ConsultantReturn/${applicationId}`, {});
}

adminApprove(applicationId: number): Observable<any> {
  return this.httpClient.put<any>(`${this.apiUrl}Application/AdminApproval/${applicationId}`, {});
}

// Method to return the application
adminReturn(applicationId: number): Observable<any> {
  return this.httpClient.put<any>(`${this.apiUrl}Application/AdminReturn/${applicationId}`, {});
}

adminReject(applicationId: number): Observable<any> {
  return this.httpClient.put<any>(`${this.apiUrl}Application/AdminReject/${applicationId}`, {});
}



 GetApplication(id:number): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Application/GetApplication/${id}`)
  .pipe(map(result => result))
} 

updateApplication(applicationId: number, application: any): Observable<any> {
  const url = `${this.apiUrl}ResumeApplication/UpdateApplication/${applicationId}`;
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  return this.httpClient.put(url, application, httpOptions);
}

clientSubmit(applicationId: number): Observable<any> {
  return this.httpClient.put(`${this.apiUrl}Application/ClientSubmit/${applicationId}`, {});
}

deleteApplication(applicationId: number): Observable<{ message: string }> {
  const url = `${this.apiUrl}Application/DeleteApplication/${applicationId}`;
  return this.httpClient.delete<{ message: string }>(url);
}


GetSelectedProducts(applicationId:number): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Application/GetSelectedProducts/${applicationId}`)
  .pipe(map(result => result))
} 

getRequiredDocuments(applicationId:number): Observable<any[]>{
  return this.httpClient.get<any[]>(`${this.apiUrl}Application/GetAllRequiredDocuments/${applicationId}`)
  
} 

getProgressBar(applicationId:number): Observable<any[]>{
  return this.httpClient.get<any[]>(`${this.apiUrl}Application/ProgressBar/${applicationId}`)
  
} 

requestAdditionalDocuments(dto: any): Observable<any> {
  return this.httpClient.post<any>(`${this.apiUrl}Application/RequestDocuments`, dto);
}

adminVerifyDocument(submittedDocument: any): Observable<any> {
  return this.httpClient.put(`${this.apiUrl}Application/AdminVerifyDocument`, submittedDocument);
}

// Consultant Verify Document
consultantVerifyDocument(submittedDocument: any): Observable<any> {
  return this.httpClient.put(`${this.apiUrl}Application/ConsultantVerifyDocument`, submittedDocument);
}

// Delete Submitted Document
deleteSubmittedDocument(submittedDocumentId: number): Observable<any> {
  return this.httpClient.delete(`${this.apiUrl}Application/DeleteSubmittedDocument/${submittedDocumentId}`);
}

uploadFile(formData: FormData): Observable<any> {
  return this.httpClient.post<any>('https://amplinode-aee2frexatcbcbhr.southafricanorth-01.azurewebsites.net/upload', formData);
}

saveSubmittedDocument(submittedDocument: any): Observable<any> {
  return this.httpClient.post<any>(`${this.apiUrl}Application/AddSubmittedDocument`, submittedDocument);
}

GetExistingCollections(applicationId:number): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Application/GetExistingCollections/${applicationId}`)
  .pipe(map(result => result))
}  

StartApplication(legalEntityId: number): Observable<any> {
  return this.httpClient.post(`${this.apiUrl}Application/StartApplication/${legalEntityId}`, {});
}
addLink(saveLink: SaveLinkDTO): Observable<any> {
  return this.httpClient.put<any>(`${this.apiUrl}Application/Addlink`, saveLink);
}
// updateApplication(applicationId: number, application: Application): Observable<Application> {
//   const url = `${this.apiUrl}/${applicationId}`;
//   return this.httpClient.put<Application>(url, application, {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   });
// }



sendRegistrationRequest(email: string): Observable<any> {

  return this.httpClient.post<any>(`${this.apiUrl}Administration/SendRegistrationRequest`, null, {
    params: { email: email },
  });
}
forgotPassword(email: string): Observable<any> {
  return this.httpClient.post<any>(`${this.apiUrl}Authentication/ForgotPassword/${encodeURIComponent(email)}`, null);

}

private savedProgreesKey = 'savedProgress';

savedProgress(stepIndex: number): void {
  localStorage.setItem(this.savedProgreesKey, JSON.stringify({currentStepIndex: stepIndex}));
}

loadProgress(): any {
    const savedProgressString = localStorage.getItem(this.savedProgreesKey);
    return savedProgressString ? JSON.parse(savedProgressString) : null;
  }

addClient(client: RegisterClient): Observable<any> {
    return this.httpClient.post<RegisterClient>(`${this.apiUrl}Administration/AddClient`, client, this.httpOptions)
      .pipe(map(result => result));
  }

  GetClient(id: number): Observable<Client> {
    return this.httpClient
      .get<Client>(`${this.apiUrl}Administration/GetClient`, {
        params: { Id: id.toString() }
      })
      .pipe(map(result => result));
  }

  GetAllClients(): Observable<Client[]> {
    return this.httpClient.get<any>(`${this.apiUrl}Administration/GetAllClients`)
      .pipe(
        map(response => response.$values) // Extract the array from the response object
      );
  }
  GetAllMyClients(): Observable<Client[]> {
    return this.httpClient.get<any>(`${this.apiUrl}Administration/GetAllMyClients`)
      .pipe(
        map(response => response.$values) // Extract the array from the response object
      );
  }
  getEftCredits(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}CRUD/GetAllEftCreditAsync`);
  }

  getEWalletOptions(eftCreditId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}CRUD/GetAllEWalletOptionAsync/${eftCreditId}`);
  }

  GetAllClientsReports(): Observable<Client[]> {
    return this.httpClient.get<any>(`${this.apiUrl}Administration/GetAllClientsDto`)
      .pipe(
        map(response => response.$values) // Extract the array from the response object
      );
  }

  // deleteClient(id: number): Observable<any> {
  //   return this.httpClient.delete(`${this.apiUrl}Administration/DeleteClient/${id}`);
  // }

  deleteClient(clientId: number): Observable<void> {
    const url = `${this.apiUrl}Administration/DeleteClient/${clientId}`;
    return this.httpClient.delete<void>(url);
  }


// saveApplication(formData: any): Observable<any> {
//   return this.httpClient.post(`${this.apiUrl}Application/UpdateApplication`, formData);
// }

//Comment 
submitComment(comment: any): Observable<any> {
  return this.httpClient.post(`${this.apiUrl}Application/Comment`, JSON.stringify(comment), this.httpOptions);
}

getConsultantsLinkedApplicants(employeeId: number): Observable<any> {
  return this.httpClient.get<any>(`${this.apiUrl}Administration/GetConsultantsLinkedApplicants/${employeeId}`);
}

getAllConsultants(): Observable<Consultant[]> {
  return this.httpClient.get<Consultant[]>(`${this.apiUrl}Administration/GetAllConsultants`);
}

getLoggedInUserId(): number {
  // Logic to retrieve the logged-in user's ID
  // This might be stored in local storage, a cookie, or retrieved from your authentication service
  const employeeId = localStorage.getItem('employeeId');
  return employeeId ? parseInt(employeeId, 10) : 0;
}

getEmployee(employeeId: number): Observable<Employee> {
  return this.httpClient.get<Employee>(`${this.apiUrl}Administration/GetEmployee/${employeeId}`);
}

getEmployeeId(): Observable<number> {
  return this.httpClient.get<number>(`${this.apiUrl}Authentication/GetEmployeeId`);
}

getCurrentUser(): Observable<Employee> {
  return this.httpClient.get<Employee>(`${this.apiUrl}Authentication/GetCurrentUser`, this.httpOptions)
    .pipe(map(result => result));
}

getAccounts(applicationId:number): Observable<any[]>{
  return this.httpClient.get<any[]>(`${this.apiUrl}Application/GetAccounts/${applicationId}`)
  
} 

getProcessingCodes(applicationId:number): Observable<any[]>{
  return this.httpClient.get<any[]>(`${this.apiUrl}Application/GetProcessingCodes/${applicationId}`)
  
} 

addBackupAccount(account: any): Observable<any> {
  return this.httpClient.post<any>(`${this.apiUrl}Application/AddBackupAccount`, account);
}

GetRadioOptions(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}CRUD/GetRadioOptions`)
  
}
deleteFile(fileId: string): Observable<any> {
  return this.httpClient.delete<any>(`https://amplinode-aee2frexatcbcbhr.southafricanorth-01.azurewebsites.net/delete-file/${fileId}`);
}

ClientdeleteSubmittedDocument(link: string): Observable<any> {
  const params = new HttpParams().set('link', link); // Passing the link as a query param
  return this.httpClient.delete(`${this.apiUrl}Application/ClientDeleteSubmittedDocument`, { params });
}

}