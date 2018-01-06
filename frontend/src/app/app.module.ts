import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlsModule } from './app.controls';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { RoutingModule } from './app.routing';
import 'hammerjs';

// Services
import {ValidateService} from './services/validate.service';
import { AuthService } from './services/auth.service';

// Components
import { AppComponent } from './app.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { UsersListComponent, DialogBox } from './users-list/users-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNewUserComponent,
    UsersListComponent,
    NavBarComponent,
    EditUserComponent,
    DialogBox,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ControlsModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    RoutingModule,
  ],
  providers: [
    ValidateService,
    AuthService,
  ],
  entryComponents: [
    DialogBox
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
