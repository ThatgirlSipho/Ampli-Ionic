export interface IndustryRegulatoryBody
{
    industryRegulatoryBodyId: number,
    description: string,
    applications: string[];
}

export interface IdentificationType 
{
    identificationTypeId: number,
    description: string
}

export interface LegalEntityTypes
{
    legalEntityTypeId: number,
    description: string,
    applications: string[],

}
export interface LegalEntityStructures
{
    legalEntityStructureId: number,
    description: string,
    applications: string[],
    shareholders: Shareholder[],

}
export interface MandateTypes
{
    mandateTypeId: number,
    description: string,
    applications: string[],
}

export interface CollectionType
{
    collectionTypeId: number,
    description: string
}

export interface AlternativeSupplierReason
{
    alternativeSupplierReasonsId: number,
    description: string,
    otherSuppliersReasons: string[]
    
}

export interface BankName
{
    bankNameId: number,
    description: string
    accounts: string[]
}

export interface AccountType
{
    accountTypeId: number,
    description: string,
    accounts: string[],
}

export interface DebtorManagementSystem
{
    debtorManagementSystemId: number,
    description: string
    processingCodes: string[];
}

export interface Product
{
    productId: number,
    description: string,
    selectedProducts: string[],
}

export interface RequiredDocument {
  requiredDocumentId: number;
  description: string; 
  applicationRequiredDocuments: string[];
  hardcodedDescription?: string;
}


export class AuthenticationMechanisms 
{
  
    authenticationMechanismsId: number = 0;
    description: string = '';
}

export class ApplicationStatus 
{
  
    applicationStatusId: number = 0;
    description:String = '';
    applications: string [] = [];
}

export interface Login {
    username: string ;
    password: string ;
}

export interface User {
  id: string;
  userName: string;
  jwt: string;
  role: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}

export interface Register {
    username: string ;
    password: string ;
}

export interface Login2FARequest {
    username: string ;
    code: string ;
}

export interface RegisterClient {
    titleId: number ;
    name: string;
    surname: string;
    email: string;
    cellNumber: number;
    businessName: string ;
}

export interface RegisterEmployee {
    titleId: number ;
    name: string;
    surname: string;
    email: string;
    cellNumber: number;
    profilePic: string ;
}

export interface Application {
  applicationId: number;
  legalEntityName: string;
  legalEntityRegistrationNumber: string;
  legalEntityTradingName: string;
  legalEntityPhysicalAddress: string;
  legalEntityPostalAddress: string;
  vatRegisteredBool: boolean;
  vatRegistrationNumber: string;
  industryDescription: string;
  regulatoryBodyRegistrationNumber: string;
  branchOutletBoolean: boolean;
  callCenterBoolean: boolean;
  
  existingPaymentProviderBoolean: boolean;
  applicationStartDateTime: string;
 
  integration: boolean;
  masterUserFullName: string;
  masterUserIdnumber: string;
  masterUserEmail: string;
  masterUserMobileNumber: string;
  masterUserCapacity: string;
  masterUserDependantBit:boolean;
  mandateTypeId: number;
  clientId: number;
  legalEntityTypeId: number;
  industryRegulatoryBodyId: number;
  applicationStatusId: number;
  driveLink:string;
  aetEmail:string;
  processingMonthlyLimit:string;
  otherIndustryBody:string;
  accounts: Account[];
  aetManagements: AetManagement[];
  applicationRequiredDocuments: ApplicationRequiredDocument[];
  applicationStatus: ApplicationStatus;
  authorizedSignatories: AuthorizedSignatory[];
  comments: Comment[];
  debtEntities: DebtEntity[];
  existingCollections: ExistingCollections[];
  industryRegulatoryBody: IndustryRegulatoryBody;
  legalEntityDependants: LegalEntityDependant[];
  legalEntityType: LegalEntityTypes;
  mandateType: MandateTypes;
  client: Client;
  otherSupplierReasons: OtherSupplierReasons[];
  processingCodes: ProcessingCode[];
  selectedProducts: SelectedProduct[];
  shareholders: Shareholder[];  

}

export interface Account {
  accountId: number;
  bankNameId: number;
  accountTypeId: number;
  accountHolderName: string;
  accountNumber: number;
  branchName: string;
  applicationId: number;
  aetBool: boolean;
  backUpDebitBool: boolean;
  debitBool: boolean;
  minimumDailyTransferLimit: number;
  accountType: AccountType;
  application?:any;
  bankName: BankName;
  processingCodes: ProcessingCode[];
}

export interface PagedResponse<T> {
  $id: string;
  data: {
    $id: string;
    $values: T[];
  };
  totalRecords: number;
}
export interface AuditLog {
  auditLogId: number;
  userId: string;
  tableName: string;
  action: string;
  keyValues: string;
  oldValues: string;
  newValues: string;
  dateTime: Date;
}

export interface ProcessingCode {
  processingCodeId: number;
  applicationId: number;
  pC_TradingName: string;
  landlordName: string;
  landlordNumber: string;
  pcEmailAddress: string;
  managerName: string;
  managerNumber: string;
  abbreviatedName: string;
  physicalAddress: string;
  pcDebtorNumber: string;
  pcDebtorName: string;
  pcDebtorTeleNumber: string;
  pcDebtorEmailAddress: string;
  debtorManagementSystemId: number;
 application: string;
 accountId: number;
 optionId:number;
// account: string;
 
  debtorManagementSystem: DebtorManagementSystem;
}

export interface AetManagement {
  applicationId: number;
  aetManagementId: number;
  emailAddress: string;
  application: string;
}

export interface ApplicationRequiredDocument {
  applicationRequiredDocumentId: number;
  requiredDocumentId: number;
  applicationId: number;
  description: string;
  application: string;
  requiredDocument: RequiredDocument;
  submittedDocuments: SubmittedDocument[];
}

export interface SubmittedDocument {
  submittedDocumentId: number;
  applicationRequiredDocumentId: number;
  submissionDateTime: string;
  documentAge: number;
  verificationStatus: boolean;
  verificationDate: string;
  document: string;
  applicationRequiredDocument: string;
  employeeId: number;
  employee: Employee;
}

export interface Employee {
  employeeId: number;
  titleId: number;
  name: string;
  surname: string;
  fullName: string;
  email: string;
  cellNumber: string;
  profilePic: string;
  userId: string;
  user: User;
  title: Title;
  clients: string[];
  comments: string[];
  submittedDocuments: string[];
  managerId: number;
  manager: string;
  subordinates: string[];
  role: string;
}

export interface Title {
  titleId: number;
  description: string;
  clients: string[];
  employees: string[];
}

export interface AuthorizedSignatory {
  authorizedSignatoryId: number;
  applicationId: number;
  signatoriesIdentificationNumber: string;
  signatoriesCellNumber: string;
  signatoriesEmailAddress: string;
  signatoriesCapacity: string;
  application: string;
  legalDependantBit:boolean,
  signatoriesName:string;
}

export interface LegalEntityDependant {
  legalEntityDependantId: number;
  dependantsFullName: string;
  dependantsIncomeTaxNumber: string;
  identificationTypeId?: number;
}

export interface Comment {
  commentId: number;
  description: string;
  datePosted: string;
  clientViewBool: boolean;
  applicationId: number;
  resolved: boolean;
  application: string;
  employeeId: number;
  employee: Employee;
}

export interface DebtEntity {
  debtEntityId: number;
  applicationId: number;
  description: string;
  application: string;
}

export interface ExistingCollections {
  existingCollectionsId: number;
  collectionTypeId: number;
  applicationId: number;
  application?: any; 
  cardPayments?: any;
  cashes?: any;
  debiChecks?: any;
  efts?: any;
  sefts?: any;
}

export interface CardPayment {
  cardPaymentId: number;
  existingCollectionsId: number;
  monthlyDebitValue: number;
  monthlyCreditValue: number;
  currentServiceProvider: string;
  debitCommission: number;
  creditCommission: number;
}

export interface Cash {
  cashId: number;
  existingCollectionsId: number;
  monthlyValue: number;
  monthlyVolume: number;
  successRate: number;
  electronicBoolean: boolean;
}

export interface DebiCheck {
  debicheckId: number;
  existingCollectionsId: number;
  monthlyValue: number;
  monthlyVolume: number;
  successRate: number;
  existingDispute: number;
  averageTrackingDaysUsed: number;
}

export interface Eft {
  eftId: number;
  existingCollectionsId: number;
  monthlyValue: number;
  monthlyVolume: number;
  successRate: number;
  existingDispute: number;
}

export interface Seft {
  seftId: number;
  existingCollectionsId: number;
  monthlyValue: number;
  monthlyVolume: number;
  successRate: number;
}

export interface LegalEntityDependant {
  legalEntityDependantId: number;
  applicationId: number;
  dependantsFullName: string;
  dependantsIncomeTaxNumber: string;
  application: string;
}

export interface Client {
  clientId: number;
  titleId: number;
  employeeId: number;
  name: string;
  surname: string;
  email: string;
  fullName: string;
  cellNumber: string;
  dateJoined: string;
  businessName: string;
  employee: Employee;
  title: Title;
  userId: string;
  user: User;
  applications: string[];
}


export interface OtherSupplierReasons {
  applicationId: number;
  otherSupplierReasonsId: number;
  alternativeSupplierReasonsId: number;
  otherDescription: string;
  alternativeSupplierReasons: AlternativeSupplierReason;
  application: string;
}

export interface SelectedProduct {
  selectedProductId: number;
  applicationId: number;
  productId: number;
  allpsManagementPlatforms?:any;
  application?:any;
  avs?:any;
  debiCheckProducts?:any;
  debitCreditPayments?: any;
  eftcreditDetail?:any;
  eftDebits?: any;
  socialGrantEfts?: any;
}

export interface AllpsManagementPlatform {
  allpsManagementPlatformId: number;
  selectedProductId: number;
  selectedProduct: string;
  description: string;
}

export interface Av {
  avId: number;
  selectedProductId: number;
  selectedProduct: string;
  description: string;
}

export interface DebiCheckProduct {
  debicheckProductId: number;
  selectedProductId: number;
  description: string;
  selectedProduct: string;
}

export interface DebitCreditPayment {
  debitCreditPaymentId: number;
  selectedProductId: number;
  description: string;
  selectedProduct: string;
}

export interface EftDebit {
  eftDebitId: number;
  selectedProductId: number;
  description: string;
  selectedProduct: string;
}

export interface SocialMediaIndicator {
  socialMediaIndicatorId: number;
  selectedProductId: number;
  description: string;
  selectedProduct: string;
}

export interface ValueAddedProduct {
  valueAddedProductId: number;
  selectedProductId: number;
  description: string;
  selectedProduct: string;
}

export interface Consultant {
    employeeId: number;
    name: string;
    surname: string;
    consultantName: string;
    numberOfApplicants: number;
  }
  
  export interface Applicant {
    clientId: number;
    name: string;
    surname: string;
  }
export interface Shareholder {
  shareholderId:number;
  applicationId:number;
  shareholderLegalEntityName: string;
  legalEntityStructureId:number;
}

export interface SaveLinkDTO {
  applicationId: number;
  driveLink?: string;
}