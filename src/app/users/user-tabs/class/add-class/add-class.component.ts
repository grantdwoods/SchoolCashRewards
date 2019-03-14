import { Component, OnInit} from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { ClassService } from '../../../../services/class.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss'],
})
export class AddClassComponent implements OnInit {

  className: string = "";
  classID: string = "";
  studentArray: any = []; //Array<object> = [];
  userID: string = "";
  firstName: string = "";
  lastName: string = "";

  constructor(
    private studentService: StudentService, 
    private classService: ClassService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  async ngOnInit() {

  }

  onClickAddStudents(userID: string, firstName: string, lastName: string)
  {
    if(userID.trim() != "" && firstName.trim() != "" && lastName.trim() != "")
    {
      this.studentArray.push({strStudentID: userID, strFirstName: firstName, strLastName: lastName});
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

  onClickRegisterClass()
  {
    this.registerClass();
  }

  async registerClass()
  {
    if(this.studentArray.length > 0 && this.className.trim() != "")
    {
      try
      {
        let id = await this.classService.postNewClass(this.className).toPromise();
        this.classID = id['entry'];
        let data1 = await this.classService.postNewTeaches(this.classID).toPromise();
        
        console.log(this.classID);

        for(let student of this.studentArray)
        {
          let data2 = await this.studentService.postStudentInfo(student['strStudentID'], student['strFirstName'], student['strLastName']).toPromise();
          let data3 = await this.classService.postNewTakes(this.classID, student['strStudentID']).toPromise();
        }

        this.router.navigateByUrl('/user-tabs/class');
      }
      catch(error)
      {
        console.log(error);
        this.authService.presentToastPos('Class could not be saved', 'bottom', 'danger');
        this.router.navigateByUrl('/user-tabs/class');
      }
    }
    else
      this.authService.presentToastPos('Class must have name and at least one student', 'bottom', 'danger');
  }
}
