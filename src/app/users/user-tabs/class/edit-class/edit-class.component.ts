import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { ClassService } from '../../../../services/class.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss'],
})
export class EditClassComponent implements OnInit {

  className: string = "";
  classID: string = "";
  studentArray: any = []; //Array<object> = [];
  userID: string = "";
  firstName: string = "";
  lastName: string = "";
  hasClass: boolean = true;

  constructor(
    private studentService: StudentService, 
    private classService: ClassService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  async ngOnInit() {
    try
    {
      let data1 = await this.classService.getClassForTeacher().toPromise();
      this.classID = data1[0]['intClassID'];

      let data3 = await this.classService.getClassByID(parseInt(this.classID)).toPromise();
      this.className = data3[0]['strClassName'];
      this.hasClass = true;
      console.log(data3);
      console.log(this.classID);
      
      let data2 = await this.classService.getStudentsInClass(parseInt(this.classID)).toPromise();
      console.log(data2);
      this.studentArray = data2;
    }
    catch(error)
    {
      console.log(error);
    }

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
        if(!this.hasClass) 
        {
          let id = await this.classService.postNewClass(this.className).toPromise();
          this.classID = id['entry'];
          let data1 = await this.classService.postNewTeaches(this.classID).toPromise();
          console.log('checkpoint 1');
        }
        
        console.log(this.classID);

        for(let student of this.studentArray)
        {
          let data2 = await this.studentService.postStudentInfo(student['strStudentID'], student['strFirstName'], student['strLastName']).toPromise();
          console.log('checkpoint 2');
          let data3 = await this.classService.postNewTakes(this.classID, student['strStudentID']).toPromise();
          console.log('checkpoint 3');
        }

        this.router.navigateByUrl('/user-tabs/class')
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
