import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../../services/student.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

  userID: string;
  studentInfo: object = [];
  constructor(private activatedRoute: ActivatedRoute, private studentService: StudentService) { }

  ngOnInit() {
    this.userID = this.activatedRoute.snapshot.paramMap.get('id');

    this.studentService.getStudentInfo(this.userID).subscribe(
      studentInfo =>{
        this.studentInfo = studentInfo;
      },
      error => {
        console.log(error["error"]["err-message"]);
      });
  }

}
