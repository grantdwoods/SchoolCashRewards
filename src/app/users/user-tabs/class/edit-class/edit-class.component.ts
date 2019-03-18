import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../../../services/class.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RegistrationService } from '../../../../services/registration.service';
import { StudentService } from '../../../../services/student.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss'],
})
export class EditClassComponent implements OnInit {

  className: string = "";
  classNameStart: string = "";
  classID: number;
  studentArray: any = []; //Array<object> = [];
  userID: string = "";
  firstName: string = "";
  lastName: string = "";
  password: string = "";
  savePassword: boolean = false;
  hasClass: boolean = true;

  constructor(
    private classService: ClassService,
    private authService: AuthenticationService,
    private regService: RegistrationService,
    private router: Router,
    public alertController: AlertController,
    private studentService:StudentService
  ) { }

  async ngOnInit() {
      await this.checkHasClass();

      if(this.hasClass) 
      {
        await this.refreshClassInfo();
        await this.refreshStudents();
      }

  }

  async onClickAddStudents(userID: string, firstName: string, lastName: string, password: string)
  {
    if(userID.trim() != "" && firstName.trim() != "" && lastName.trim() != "" && password.trim() != "")
    {
      // this.studentArray.push({strStudentID: userID, strFirstName: firstName, strLastName: lastName});
      await this.addAlert(userID, firstName, lastName, password);
    }

    else
      this.authService.presentToastPos('Student must have ID, first, and last name', 'bottom', 'danger');
  }

  async refreshStudents()
  {
    let data = await this.classService.getStudentsInClass(this.classID).toPromise();
    this.studentArray = data;
  }

  async refreshClassInfo()
  {
    let data3 = await this.classService.getClassByID(this.classID).toPromise();
    this.className = data3[0]['strClassName'];
    this.classNameStart = data3[0]['strClassName'];
  }

  async onClickRemoveStudent(strStudentID: string)
  {
    console.log(strStudentID)
    let data = await this.studentService.getStudentInfo(strStudentID).toPromise();
    let firstName = data[0]['strFirstName'];
    let lastName = data[0]['strLastName'];
    this.deleteAlert(strStudentID, firstName, lastName);
  }

  async onClickSaveClass()
  {
    // console.log(this.classNameStart + " => " + this.className);

    if(this.classNameStart != this.className)
    {
      await this.classService.putClassName(this.classID, this.className).toPromise();
      console.log('Changing class name');
    }

    this.router.navigateByUrl('/users/user-tabs/class');
  }

  async deleteAlert(strStudentID: string, firstName: string, lastName: string) {
    const alert = await this.alertController.create({
      header: 'Remove Student',
      subHeader: 'Are you sure?',
      message: 'Are you sure you want to delete ' + firstName + ' ' + lastName + ' student from the class?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Remove',
          cssClass: 'danger',
          handler: () =>
          {
            this.deleteAlertConfirm(strStudentID);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteAlertConfirm(userID: string)
  {
    await this.classService.removeStudentFromClass(userID).toPromise();
    await this.refreshStudents();
  }

  async addAlert(userID: string, firstName: string, lastName: string, password: string) {
    const alert = await this.alertController.create({
      header: 'Add Student',
      subHeader: 'Are you sure?',
      message: 'Are you sure you want to add this student to the class?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Add',
          handler: (index) =>
          {
            this.addAlertConfirm(userID, firstName, lastName, password);
          }
        }
      ]
    });

    await alert.present();
  }

  async addAlertConfirm(userID: string, firstName: string, lastName: string, password)
  {
    // Register the student here
    if(!this.hasClass)
    {
      let id = this.authService.getUserID();
      let data = await this.classService.getTeacherInfo(id).toPromise();
      let firstName = data[0]['strFirstName'];
      let lastName = data[0]['strLastName'];
      this.className = firstName + " " + lastName + "'s class";
      let data2 = await this.classService.postNewClass(this.className).toPromise();
      this.classID = data2['entry'];
      let data3 = await this.classService.postNewTeaches(this.classID).toPromise();
      await this.checkHasClass();
      console.log(this.hasClass);
    }
    try
    {
      this.authService.toggleStorageState();
      await this.regService.registerStudent(userID, password).toPromise();
      this.authService.toggleStorageState();
      await this.studentService.postStudentInfo(userID, firstName, lastName).toPromise();
      await this.classService.postNewTakes(this.classID, userID).toPromise();
      await this.refreshStudents();
      await this.refreshClassInfo();
    }
    catch(error)
    {
      if(error['status'] == 409)
      {
        this.authService.toggleStorageState();
        await this.duplicateAlert(userID);
      }
    }

    this.userID = "";
    this.firstName = "";
    this.lastName = "";
    
    if(!this.savePassword)
    {
      this.password = "";
    }
  }

  async duplicateAlert(userID: string)
  {
    const alert = await this.alertController.create({
      header: 'User ID Error',
      subHeader: 'ID already exists',
      message: 'This user ID already exists. Try a different User ID or view the student with current ID',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'View student',
          handler: () =>
          {
            this.duplicateAlertViewStudent(userID);
          }
        }
      ]
    });

    await alert.present();
  }

  async duplicateAlertViewStudent(userID: string)
  {            
    try 
    {
      let data = await this.studentService.getStudentInfo(userID).toPromise();
      this.router.navigateByUrl('/user-tabs/student/student-info/' + userID);
    }
    catch(error)
    {
      if(error['status'] == 404)
        this.authService.presentToastPos('This ID belongs to someone other than a student', 'bottom');
      else
        console.log('Unknown error');  
    }
  }

  async checkHasClass()
  {
    try
    {
      let data1 = await this.classService.getClassForTeacher().toPromise();
      this.classID = data1[0]['intClassID'];

      this.hasClass = true;
    }
    catch(error)
    {
      if(error['status'] == 404)
        console.log('Teacher has no class');
      else
        console.log('Unknown error');
    }

    if(isNullOrUndefined(this.classID))
    {
      this.hasClass = false;
      console.log(this.hasClass);
    }
  }

}
