import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
   * Function that uses Routing to navigate the user to the `/movies` route
   */
  viewMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Function that uses Routing to navigate the user to the `/profile` route
   */
  viewProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Function to clear data from localStorage and navigate the user to the '/welcome' route
   */
  logMeOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}//end NavbarComponent
