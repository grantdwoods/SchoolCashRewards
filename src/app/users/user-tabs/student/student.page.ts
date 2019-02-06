import { Component, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  headerTitle = "Student";
  constructor(private router: Router) { }

  ngOnInit() {
    //this.router.navigateByUrl('user-tabs/student/all-classes');
  }
}
