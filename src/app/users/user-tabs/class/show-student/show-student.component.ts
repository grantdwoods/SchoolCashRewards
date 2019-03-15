import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../services/authentication.service';
import { AuthGuardService } from '../../../../services/auth-guard.service';
import { StudentService } from '../../../../services/student.service';
import { ClassService } from '../../../../services/class.service';

@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.scss']
})
export class ShowStudentComponent implements OnInit {

  studentID: string;
  studentCoupons: number;
  studentClass: string;
  studentFirstName: string;
  studentLastName: string;
  studentClassCoupons: number;

  constructor(
    private authService: AuthenticationService,
    private studentService: StudentService,
    private classService: ClassService
  ) {}

  async ngOnInit() {
    this.studentID = this.authService.getUserID();
    let data1 = await this.studentService.getStudentInfo(this.studentID).toPromise();
    console.log(data1);
    this.studentFirstName = data1[0]['strFirstName'];
    this.studentLastName = data1[0]['strLastName'];
    this.studentCoupons = data1[0]['intCoupons'];
    
    let data2 = await this.classService.getClassByStudentID(this.studentID).toPromise();
    this.studentClass = data2[0]['strClassName'];
    this.studentClassCoupons = data2[0]['intClassCoupons'];
    
  }

}
