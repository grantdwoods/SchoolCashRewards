import { Component, OnInit } from '@angular/core';
import { InitialStylingFlags } from '@angular/compiler/src/core';

@Component({
  selector: 'app-existing-school',
  templateUrl: './existing-school.component.html',
  styleUrls: ['./existing-school.component.scss']
})
export class ExistingSchoolComponent implements OnInit {

  private schoolID:number;
  private password: string;
  private role: string = "t";
  private userID: string;


  constructor() { }

  ngOnInit() {
    
  }

}
