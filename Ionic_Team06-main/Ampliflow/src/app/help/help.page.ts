import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage  {
  searchTerm: string = '';
  
  // Expanded sections array to track which sections are open
  expandedSections: boolean[] = [];

  // Help content with additional paragraphs in 'extraContent' field
  helpContent = [
    {
      heading: 'Applications',
      content: 'Learn how to start and complete your application',
      extraContent: [
        'You can start a new application by clicking on the "New Application" button.',
        'The application process is a comprehensive procedure that requires careful attention to detail. As you proceed, you will be required to fill in various input fields that capture essential information about you and your business. This section is critical as the accuracy of the information provided will directly impact the outcome of your application.',
      'Personal Information: You will need to enter your full name, date of birth, and contact details. Ensure that this information is accurate and matches the details on your official identification documents.',
       'Business Information: Provide detailed information about your business, including its name, registration number, address, and the nature of its operations. This data is crucial for verifying your business legitimacy and assessing its eligibility for the application process.',
     'Financial Details: You will be asked to provide financial information such as your business’s annual revenue, tax identification number, and bank account details. This information helps in evaluating the financial health of your business.',
       'Once an application is submitted, you can track its status on the dashboard.',
       'Upload Documents: As part of the application process, you may be required to upload certain documents, such as proof of identity, business registration certificates, and financial statements. Make sure that all documents are legible and up to date.',
       'Review and Submit: Before submitting your application, review all the information you have entered. Any errors or omissions can delay the processing of your application or result in its rejection. Once you are confident that all the information is accurate, click the Submit button to finalize your application.',
       'After submission, you will receive a confirmation email. Your application will then be reviewed by our team, and you will be notified of the outcome via email. Keep an eye on your inbox for updates and further instructions.',
       'For detailed guidance, refer to the user manual or contact support.'
      ]
    },
    {
      heading: 'Documents',
      content: 'Find out how to upload, submit, and manage your documents.',
      extraContent: [
        'Ensure that all required documents are uploaded in the correct format (PDF, JPG, PNG, Docx, or Doc).',
        'You can preview your uploaded documents before submission.',
        'If any documents are missing, you will receive a notification.',
        'All Documents submitted must be up to date, the latest document age is 3 months. In the event that your document is older than 3 months, our team will flag it and request you reupload it',
        'All documents are verfied through extensive background review checks, carried out my a team of experts. Please do ensure all information is correct and valid',
        
        
      ]
    },
    {
      heading: 'Application Status',
      content: 'Understand what each application status means and how to track progress.',
      extraContent: [
        'Pending Upload: You have not yet submitted your application',
        'Uploaded: Your application has been successfully uploaded, please be patient as it is now going through the first round of validation',
        'Submitted: Your application has passed the first round of validation. It is now going through extensive background investigations',
        'Approved: Your application has been approved. You will receive further instructions.',
        'Rejected: Your application was rejected. Contact support for more details.',
        'Please note, your status may change back and forth, depending on the validility of your documents. You may be asked to reupload invalid or old documents'
      ]
    },
    {
      heading: 'Contact',
      content: 'Get in touch with support for any issues or questions.',
      extraContent: [
        'You can contact us via email at support.ampliflow@gmail.com.',
        'Our support hotline is available from 9 AM to 5 PM, Monday through Friday.',
        'For urgent matters, please contact your consultant',
        'In the event that you do not have a consultant, ensure your reach out to support to be allocated one, we pride ourselves in our ability to provide specialized support so ensure you do take advantage of this benefit'
      ]
    }
  ];

  // Filtered content that dynamically updates based on the search term
  filteredContent = [...this.helpContent];

  constructor( private navController: NavController) {
    // Initialize all sections as collapsed
    this.expandedSections = new Array(this.helpContent.length).fill(false);
  }

  // Function to filter the help content based on the search term
  filterHelp() {
    if (!this.searchTerm.trim()) {
      this.filteredContent = [...this.helpContent];
    } else {
      const search = this.searchTerm.toLowerCase();
      this.filteredContent = this.helpContent.filter(section =>
        section.heading.toLowerCase().includes(search) || section.content.toLowerCase().includes(search)
      );
    }

    // Reset expanded sections when filtering
    this.expandedSections = new Array(this.filteredContent.length).fill(false);
  }

  // Function to toggle the display of extra content
  toggleSection(index: number) {
    this.expandedSections[index] = !this.expandedSections[index];
  }
  goBack() {
    this.navController.back();
  }
}
