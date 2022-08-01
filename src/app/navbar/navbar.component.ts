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

  //define routes below...TBD
  viewMovies(): void {
    this.router.navigate(['movies']);
  }

  viewProfile(): void {
    this.router.navigate(['profile']);
  }

  logMeOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

}
