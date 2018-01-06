import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { ValidateService } from './../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {
  private newUser: User = new User();
  private confirmation: String;

  constructor(
    private validateService:ValidateService,
    private authService: AuthService,
    private flashMessagesService:FlashMessagesService
  ) { }

  ngOnInit() {
    this.newUser.name = 'ramin';
    this.newUser.email = 'ramin.armanfar@gmail.com';
    this.newUser.username = 'ram2000';
    this.newUser.password = '123';
    this.confirmation = '123';
  }

  onClick() {
    // Required Fields
    if(!this.validateService.validateRegister(this.newUser)) {
      this.flashMessagesService.show('Please fill in all fields.', {cssClass: 'alert-danger', timeout:5000});
      return false;
    }
    // Required Email
    if(!this.validateService.validateEmail(this.newUser.email)) {
      this.flashMessagesService.show('Please use valid email.', {cssClass: 'alert-danger', timeout:5000});
      return false;
    }
    //Check for password confirmation
    if(!this.validateService.validatePasswordConfirmation(this.newUser.password, this.confirmation)) {
      this.flashMessagesService.show('Password is not matched.', {cssClass: 'alert-danger', timeout:5000});
      return false;
    }

    // Register new user
    this.authService.registerUser(this.newUser).subscribe(data => {
      if(data.success) {
        this.flashMessagesService.show('You have been registered successfully.', {cssClass: 'alert-success', timeout:5000});
        //this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('Error on registration!', {cssClass: 'alert-danger', timeout:5000});
        //this.router.navigate(['/register']);
      }
    });
  }
}
