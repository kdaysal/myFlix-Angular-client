import { Component, OnInit, Input } from '@angular/core';

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
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  //Decorator to define the component's input / output
  @Input() userData = { Username: '', Password: '', Email: '', BirthDate: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  //this method is called once the component has received all its inputs (i.e. all its data-bound properties) from the user
  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      console.log(`result: ${result}`);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log(`result: ${result}`);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}