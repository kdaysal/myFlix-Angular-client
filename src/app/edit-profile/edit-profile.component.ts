import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @Input() userData: any = {};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public router: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  //function to use fetchApiData to call the editUser endpoint and update the user's profile details
  editUser(): void {
    const username = localStorage.getItem('user');
    console.log(`editUser() called in edit-profile-component.ts`);
    this.fetchApiData.editUser(this.userData, username).subscribe((result) => {
      this.dialogRef.close();
      console.log(`result: ${result}`);
      this.snackBar.open('Your profile was successfully updated!', 'OK', {
        duration: 3000
      });

      //After updating user info, clear local storage and redirect user back to the Welcome page so they can login with their new credentials
      localStorage.clear();
      this.router.navigate(['welcome']);
      this.snackBar.open('Please use your new credentials to login', 'OK', {
        duration: 3000
      });
    })
  }

}//end EditProfileComponent
