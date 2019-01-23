import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { ClassService } from '../../../services/class.service';

@Component({
  selector: 'app-class-component',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  students$: Object;

  constructor(private authService: AuthenticationService, private classService: ClassService) { }

  private testing:boolean = this.authService.isAuthenticated();
  ngOnInit() 
  {
    this.classService.getStudentsInClass(10)
    .subscribe(students => {
      this.students$ = students;
      console.log(this.students$);});
    }
}