import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DirectorComponent>,

  ) { }

  ngOnInit(): void {
  }

}
