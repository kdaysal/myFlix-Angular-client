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
    //call to get director info here
    this.getDirector("Quentin%20Tarantino");
  }

  getDirector(name: string): void {
    this.fetchApiData.getDirector(name).subscribe((resp: any) => {
      this.director = resp;
      console.log(this.director);
      return this.director;
    });
  }


}
