import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service'


@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {
  director: any = {};

  constructor(
    public dialogRef: MatDialogRef<DirectorComponent>,
    public fetchApiData: UserRegistrationService,

  ) { }

  ngOnInit(): void {
  }



}
