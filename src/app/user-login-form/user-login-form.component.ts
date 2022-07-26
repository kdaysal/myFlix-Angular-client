import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// This import will be used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls I created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

//Decorator containing instructions to wire up up the class with its stylesheet and template file
//the selector property defines the custom HTML element into which this component will render
//...my form component can be used elsewhere as follows: <app-user-registration-form></app-user-registration-form>
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  //Decorator to define the component's input / output
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  //this method is called once the component has received all its inputs (i.e. all its data-bound properties) from the user
  ngOnInit(): void {
  }

  /**
   * Function to process logging in the user.
   * Responsible for sending the form inputs to the backend
   * @function loginUser
   */
  loginUser(): void {
    console.log(`loginUser() running`);
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      // Logic for a successful user login below...
      //update localStorage with token and username
      localStorage.setItem('user', result.user.Username);
      localStorage.setItem('token', result.token);

      this.dialogRef.close(); // This will close the modal on success!
      console.log(`result: ${result}`);

      //upon successful user login, route the user to the '.../movies' endpoint
      this.router.navigate(['movies']);

      this.snackBar.open('Successfully logged in!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log(`result: ${result}`);
      this.snackBar.open('Unable to log in - error', 'OK', {
        duration: 2000
      });
    });
  }
}//end UserLoginFormComponent