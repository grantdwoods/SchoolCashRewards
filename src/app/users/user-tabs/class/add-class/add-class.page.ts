import { Component, OnInit} from '@angular/core';
import { StudentService } from '../../../../services/student.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.page.html',
  styleUrls: ['./add-class.page.scss'],
})
export class AddClassPage implements OnInit {

  studentArray: Array<object> = [];
  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }

  onClickAddStudents(userID: string, firstName: string, lastName: string)
  {
    this.studentArray.push({userID: userID, firstName: firstName, lastName: lastName});
  }

  onClickRemoveStudent(index: object)
  {
    this.studentArray.splice(this.studentArray.indexOf(index), 1)
  }

  onClickRegisterClass()
  {
    for(let student of this.studentArray)
    {
      this.studentService.postStudentInfo(student['userID'], student['firstName'], student['lastName']);
    }
  }
}
