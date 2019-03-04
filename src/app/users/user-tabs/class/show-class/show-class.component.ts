import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { ClassService } from '../../../../services/class.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-class',
  templateUrl: './show-class.component.html',
  styleUrls: ['./show-class.component.scss']
})
export class ShowClassComponent implements OnInit {

  constructor(private studentService: StudentService, private classService: ClassService, private router: Router) { }

  students$: any;
  classID$: number;
  className$: string;
  classCoupons$: number;

  async ngOnInit() {
    let data = await this.classService.getClassForTeacher().toPromise();
    this.classID$ = data[0]['intClassID'];

    let data2 = await this.classService.getClassByID(this.classID$).toPromise();
    this.className$ = data2[0]['strClassName'];
    this.classCoupons$ = data2[0]['intClassCoupons'];

    let data3 = await this.classService.getStudentsInClass(this.classID$).toPromise();
    this.students$ = data3;
    console.log(data3);
    console.log(data3[0]);
  }

  routeToStudent(strStudentID: string)
  {
    this.router.navigateByUrl('../student/student-info/' + strStudentID);
  }

}
