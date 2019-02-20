import { Component, OnInit} from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { ClassService } from '../../../../services/class.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.page.html',
  styleUrls: ['./add-class.page.scss'],
})
export class AddClassPage implements OnInit {

  className= "";
  classID: string;
  studentArray: Array<object> = [];
  userID = "";
  firstName = "";
  lastName = "";
  constructor(
    private studentService: StudentService, 
    private classService: ClassService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClickAddStudents(userID: string, firstName: string, lastName: string)
  {
    if(userID.trim() != "" && firstName.trim() != "" && lastName.trim() != "")
    {
      this.studentArray.push({userID: userID, firstName: firstName, lastName: lastName});
      this.userID = "";
      this.firstName = "";
      this.lastName = "";
    }

    else
      this.authService.presentToastPos('Student must have ID, first, and last name', 'bottom', 'danger');
  }

  onClickRemoveStudent(index: object)
  {
    this.studentArray.splice(this.studentArray.indexOf(index), 1)
  }

  async onClickRegisterClass()
  {
    if(this.studentArray.length > 0 && this.className.trim() != "")
    {
      try
      {
        this.classID = await this.classService.postNewClass(this.className);

        for(let student of this.studentArray)
        {
          await this.studentService.postStudentInfo(student['userID'], student['firstName'], student['lastName']);
          await this.classService.postNewTakes(this.classID, student['userID']);
        }

        this.router.navigateByUrl('/user-tabs/class')
      }
      catch(error)
      {
        console.log(error);
      }
    }
    else
      this.authService.presentToastPos('Class must have name and at least one student', 'bottom', 'danger');
  }
}
