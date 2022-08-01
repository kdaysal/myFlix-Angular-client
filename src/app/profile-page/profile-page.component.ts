import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: any = {};
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUser();
  }

  //logic to delete user's account from myFlix db
  deleteProfile(): void {
    const username = localStorage.getItem('user');
    //prompt user to confirm this action because it is irreversible
    if (confirm('This action is IRREVERSIBLE. Are you sure you want to deregister your account?')) {
      //call to deleteUser() function in fetchApiData to permanently delete the user's account
      this.fetchApiData.deleteUser(username).subscribe((result) => {
        console.log(result);
        localStorage.clear();
      })
      //if successful, navigate user back to the welcome page where they can register a new account if they wish
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open("Your account was successfully removed. We're sorry to see you go!", 'OK', {
          duration: 3000
        });
      })
    }//end if
  }//end deleteProfile

  getUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.user = resp;
      //console.log(`user: ${this.user}`);
      return this.user;
    })
  }//end getUser

  //Calls the dialog to open from EditProfileComponent if user clicks on the "Edit My Profile" button
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '380px'
    })
  }

}//end class ProfilePageComponent
