import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users:any;
  
  constructor(
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
    this.showData();
  }

  showData() {
        this.authService.getAllUsers().subscribe(data => {
      if(data.success) {
        this.users = data.users;
        //this.flashMessagesService.show('Users data fetched successfully.', {cssClass: 'alert-success', timeout:5000});
        //this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show(data.message, {cssClass: 'alert-danger', timeout:5000});
        //this.router.navigate(['/register']);
      }
    });
  }
  
  openDialog(userId: string) {
    console.log(userId);
    let dialogRef = this.dialog.open(DialogBox);
    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.authService.deleteUser(userId).subscribe(data => {
          if (data.success) {
            this.showData();
            this.flashMessagesService.show('Users data deleted successfully.', {cssClass: 'alert-success', timeout:5000});
          }
          else {
            this.flashMessagesService.show(data.message, {cssClass: 'alert-danger', timeout:5000});
          }
        });
      }
    });
  }
}

@Component({
  selector: 'app-dialog',
  styles: [
    'button{ margin: 10px; }'
  ],
  template: `
    <div>
      <p>{{message}}</p>
      <button color="primary" md-raised-button (click)="dialogRef.close(true)">Yes</button>
      <button  md-raised-button (click)="dialogRef.close(false)">No</button>
    </div>
  `
  ,
})
export class DialogBox {
  message: string = "Are you sure ?";
  constructor(private dialogRef: MdDialogRef<DialogBox>) {}
}