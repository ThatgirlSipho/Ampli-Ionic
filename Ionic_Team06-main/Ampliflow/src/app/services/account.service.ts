import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError,of, ReplaySubject } from 'rxjs';
import { catchError } from 'rxjs';
import { Login, Login2FARequest } from './model';
import { User } from './model';
import { AuditLog } from './model';
import { PagedResponse } from './model';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
apiUrl = 'https://ampliflowapi-b3bub4c0d8g6cgg8.southafricanorth-01.azurewebsites.net/api/'

httpOptions ={
  headers: new HttpHeaders({
    'Content-Type': 'application/json' 
  })
}
constructor(private httpClient: HttpClient) { }

    login(login: Login): Observable<User> {
      return this.httpClient.post<User>(`${this.apiUrl}Authentication/Login`, login);
    }

    
    verifyCode(request: Login2FARequest): Observable<any> {
      return this.httpClient.post(`${this.apiUrl}Authentication/LoginwOTP`, request, this.httpOptions);
    }

    register(password: string, username: string ): Observable<any> {
      return this.httpClient.post(`${this.apiUrl}Authentication/Register`, { password, username});
    }


    ForgotPassword(email: string): Observable<any> {
      return this.httpClient.post(`${this.apiUrl}Authentication/ForgotPassword/${email}`, {});
    }

    resetPassword(resetPasswordData: any): Observable<any> {
      return this.httpClient.post(`${this.apiUrl}Authentication/ResetPassword`, resetPasswordData);
    }

  
    addEmployee(employeeData: any, role: string): Observable<any> {
      return this.httpClient.post<any>(`${this.apiUrl}Administration/AddEmployee?role=${role}`, employeeData);
    }
  
    getAllTitles(): Observable<any[]> {
      return this.httpClient.get<any[]>(`${this.apiUrl}CRUD/GetAllTitles`);
    }
  
    getEmployeeTypes(): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}Administration/GetEmployeeTypes`);
    }
         
   /*  ConfirmRegistrationRequest(token: string,email: string ): Observable<any> {
      return this.httpClient.post<any>(`${this.apiUrl}Authentication/ConfirmRegistrationRequest`, { token, email });
    } */
      ConfirmRegistrationRequest(token: string, email: string): Observable<any> {
        const params = new HttpParams()
          .set('token', token)
          .set('email', email);
      
        return this.httpClient.get<any>(`${this.apiUrl}Administration/ConfirmRegistrationRequest`, { params });
      }
   
    getUserProfile(): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}Administration/GetUserProfile`);
    }
  
    updateUserProfile(profile: any): Observable<any> {
      return this.httpClient.put(`${this.apiUrl}Administration/EditUserProfile`, profile);
    }

   
    LinkApplicantConsultant( clientId:number, employeeId:number): Observable<any> {
      return this.httpClient.put(`${this.apiUrl}Administration/LinkApplicantConsultant`, { clientId, employeeId });
    }
    LinkConsultantConsultantManager( consultantId:number, managerId:number): Observable<any> {
      return this.httpClient.put(`${this.apiUrl}Administration/LinkConsultantConsultantManager`, { consultantId, managerId });
    }

    DelinkApplicantConsultant(clientId: number): Observable<any> {
      return this.httpClient.put(`${this.apiUrl}Administration/DelinkApplicantConsultant/${clientId}`, {});
    }
    DelinkConsultantConsultantManager(consultantId: number): Observable<any> {
      return this.httpClient.put(`${this.apiUrl}Administration/DelinkConsultantConsultantManager/${consultantId}`, {});
    }

    GetUnlinkedApplicants(): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}Administration/GetUnlinkedApplicants`);
    }
    GetUnlinkedConsultants(): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}Administration/GetUnlinkedConsultants`);
    }

    GetManagerConsultants(): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}Administration/GetUserManagerConsultants`);
    }

    GetAllConsultants(): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}Administration/GetAllConsultants`);
    }

    GetAllConsultantManagers(): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}Administration/GetAllConsultantManagers`);
    }
    GetAllEmployees(): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}Administration/GetAllEmployees`);
    }

    GetConsultantProfile(): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}Administration/GetConsultantProfile`);
    }

    GetConsultantsLinkedApplicants(employeeId: number): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}Administration/GetConsultantsLinkedApplicants/${employeeId}`  );
    }
    GetConsultantManagerConsultants(managerId: number): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}Administration/GetConsultantManagerConsultants/${managerId}`  );
    }
  
    DisableEmployee(employeeId: number): Observable<any> {
      return this.httpClient.put(`${this.apiUrl}Administration/DisableEmployee/${employeeId}`, {});
    }

    EnableEmployee(employeeId: number): Observable<any> {
      return this.httpClient.put(`${this.apiUrl}Administration/EnableEmployee/${employeeId}`, {});
    }
    DisableEmployeeWithTime( employeeId:number, time:number): Observable<any> {
      return this.httpClient.put(`${this.apiUrl}Administration/DisableEmployeewWithTime`, { employeeId, time });
    }
    getRemainingTime(employeeId: number): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}Administration/GetRemainingTime/${employeeId}`);
    }
    GetEmployee(employeeId: number): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}Administration/GetEmployee/${employeeId}`);
    }
    DeleteUser(userId: string): Observable<any> {
      return this.httpClient.delete(`${this.apiUrl}Administration/DeleteUser/${userId}`);
    }

    uploadProfilePicture(formData: FormData): Observable<any> {
      return this.httpClient.post<any>(`${this.apiUrl}Administration/UploadProfilePic`, formData);
    }

    getAllAuditLogs(): Observable<AuditLog[]> {
      return this.httpClient.get<AuditLog[]>(`${this.apiUrl}AuditTrail/Audits`);
    }

    SearchAuditLogs(userId?: string, tableName?: string, fromDate?: string, toDate?: string): Observable<AuditLog[]> {
      let params = new HttpParams();
  
      if (userId) {
        params = params.append('userId', userId);
      }
      if (tableName) {
        params = params.append('tableName', tableName);
      }
      if (fromDate) {
        params = params.append('fromDate', fromDate);
      }
      if (toDate) {
        params = params.append('toDate', toDate);
      }
  
      return this.httpClient.get<AuditLog[]>(`${this.apiUrl}AuditTrail/AuditSearch`, { params });
    }

    advancedSearchAuditLogs(
      userInput: string | undefined,
      tableName: string | undefined,
      action: string | undefined,
      fromDate: Date | undefined,
      toDate: Date | undefined,
      pageNumber: number,
      pageSize: number
    ): Observable<PagedResponse<AuditLog>> {
      let params = new HttpParams();
    
      if (userInput) {
        params = params.append('userInput', userInput);
      }
      if (tableName) {
        params = params.append('tableName', tableName);
      }
      if (action) {
        params = params.append('action', action);
      }
      if (fromDate) {
        params = params.append('fromDate', fromDate.toISOString());
      }
      if (toDate) {
        params = params.append('toDate', toDate.toISOString());
      }
      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
    
      return this.httpClient.get<PagedResponse<AuditLog>>(
        `${this.apiUrl}AuditTrail/advanced-AuditSearch`, 
        { params }
      );
    }
    
    
    getPagedAuditLogs(pageNumber: number, pageSize: number): Observable<PagedResponse<AuditLog>> {
      let params = new HttpParams();
      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
    
      return this.httpClient.get<PagedResponse<AuditLog>>(`${this.apiUrl}AuditTrail/PagedAudit`, { params });
    }
    
    
    getAllUsers(): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}AuditTrail/GetAllUsers`);
    }
}