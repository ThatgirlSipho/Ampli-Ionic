import { Component, OnInit,ViewChild,Input , ElementRef} from '@angular/core';
import { DataService } from '../services/data.service';

import { MenuController } from '@ionic/angular'; 
@Component({
  selector: 'app-comment-side-bar',
  templateUrl: './comment-side-bar.component.html',
  styleUrls: ['./comment-side-bar.component.scss'],
})
export class CommentSideBarComponent  implements OnInit {
  @Input() applicationId!: number;
  @ViewChild('sidenav') sidenav!: ElementRef;
  comments: any[] = [];  // Ensure this is initialized as an array
  filteredComments: any[] = [];
  newCommentText: string = '';
  clientViewBool: boolean = false;
  sidebarOpen: boolean = false;
  userRole: string =  'Applicant';//localStorage.getItem('role') || '';

  constructor(private dataService: DataService,private menu: MenuController) { }

  ngOnInit(): void {
    if (this.applicationId) {
      this.loadComments();
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    if (this.sidebarOpen) {
      this.menu.open('end');
    } else {
      this.menu.close('end');
    }
  }
  loadComments() {
    if (!this.applicationId) return;
    console.log('User Role:', this.userRole);
    this.dataService.getComments(this.applicationId)
      .subscribe(
        (response: any) => {
          if (response && response.$values) {
            this.comments = response.$values;  // Extract comments from $values
            
            this.filterComments();
          
          } else {
            // console.error('Unexpected response format:', response);
            this.comments = [];  // Fallback to empty array
          }
        },
       // (error) => this.snackBar.open('Failed to load comments', '', { duration: 2000 })
      );
  }

  filterComments(): void {
    this.filteredComments = this.userRole === 'Applicant'
      ? this.comments.filter(comment => comment.clientViewBool === true || comment.clientViewBool === 'true')
      : this.comments;
  }
  

  addComment() {
    if (!this.newCommentText) {
    //  this.snackBar.open('Comment cannot be empty', '', { duration: 2000 });
      return;
    }

    const newComment = {
      description: this.newCommentText,
      applicationId: this.applicationId,
      clientViewBool: this.clientViewBool
    };

    this.dataService.addComment(newComment)
      .subscribe(
        () => {
          this.newCommentText = '';
          this.clientViewBool = false;
          this.loadComments();
     //     this.snackBar.open('Comment added successfully', '', { duration: 2000 });
        },
   //     (error) => this.snackBar.open('Failed to add comment', '', { duration: 2000 })
      );
  }
}
