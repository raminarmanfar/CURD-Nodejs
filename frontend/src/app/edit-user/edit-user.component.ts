import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  private selectedUser: User = new User();
  private userToUpdate: any;
  private currentUrl: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    this.authService.getUserById(this.currentUrl.id).subscribe(data => {
      if(data.success) {
        this.selectedUser.id = this.currentUrl.id;
        this.selectedUser.name = data.user.name;
        this.selectedUser.email = data.user.email;
        this.selectedUser.username = data.user.username;
        this.userToUpdate = data.user;
        // this.selectedUser.password = data.user.password;
        // this.confirmation = data.user.password;
        //this.flashMessagesService.show('You have been registered successfully.', {cssClass: 'alert-success', timeout:5000});
        //this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('Error on getting user data! => ' + data.message, {cssClass: 'alert-danger', timeout:5000});
        //this.router.navigate(['/register']);
      }
    });
  }

  onUpdateClick() {
    debugger;
    this.authService.editUser(this.selectedUser).subscribe(data => {
      // Check if PUT request was a success or not
      if (data.success) {
        this.flashMessagesService.show('You have been registered successfully.', {cssClass: 'alert-success', timeout:5000});
      } else {
        this.flashMessagesService.show('Error on updating user data!', {cssClass: 'alert-danger', timeout:2000});

        setTimeout(() => {
          this.router.navigate(['/usersList']); // Navigate back to route page
        }, 2000);
      }
    });
  }

}
