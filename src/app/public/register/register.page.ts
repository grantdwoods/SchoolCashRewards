import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private newSchool: boolean = false;
  private existingSchool: boolean = false;
  
  constructor() { }

  ngOnInit() {
    console.log("On register");
  }

  showNewSchoolForm(){
    this.newSchool = true;
  }
  showExistingSchoolForm(){
    this.existingSchool = true;
  }
}
