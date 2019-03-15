import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { ClassService } from '../../../../services/class.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RegistrationService } from '../../../../services/registration.service';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss'],
})
export class EditClassComponent implements OnInit {

  className: string = "";
  classNameStart: string = "";
  classID: string = "";
  studentArray: any = []; //Array<object> = [];
  userID: string = "";
  firstName: string = "";
  lastName: string = "";
  password: string = "";
  savePassword: boolean = false;
  hasClass: boolean = true;

  constructor(
    private studentService: StudentService, 
    private classService: ClassService,
    private authService: AuthenticationService,
    private regService: RegistrationService,
    private router: Router,
    public alertController: AlertController
  ) { }

  async ngOnInit() {
    try
    {
      let data1 = await this.classService.getClassForTeacher().toPromise();
      this.classID = data1[0]['intClassID'];

      let data3 = await this.classService.getClassByID(parseInt(this.classID)).toPromise();
      this.className = data3[0]['strClassName'];
      this.classNameStart = data3[0]['strClassName'];
      this.hasClass = true;
      console.log(data3);
      console.log(this.classID);
      
      this.refreshStudents();
    }
    catch(error)
    {
      console.log(error);
    }

  }

  async onClickAddStudents(userID: string, firstName: string, lastName: string)
  {
    if(userID.trim() != "" && firstName.trim() != "" && lastName.trim() != "")
    {
      this.studentArray.push({strStudentID: userID, strFirstName: firstName, strLastName: lastName});
      await this.addAlert(userID, firstName, lastName);
      this.userID = "";
      this.firstName = "";
      this.lastName = "";
      
      if(!this.savePassword)
      {
        this.password = "";
      }
    }

    else
      this.authService.presentToastPos('Student must have ID, first, and last name', 'bottom', 'danger');
  }

  async refreshStudents()
  {
    let data = await this.classService.getStudentsInClass(parseInt(this.classID)).toPromise();
    this.studentArray = data;
    console.log(data);
  }

  async onClickRemoveStudent(strStudentID: string)
  {
    console.log(strStudentID)
    this.deleteAlert(strStudentID);
  }

  onClickSaveClass()
  {
    console.log(this.classNameStart + " => " + this.className);
    // this.router.navigateByUrl('/users/user-tabs/class');
  }

  async deleteAlert(strStudentID: string) {
    const alert = await this.alertController.create({
      header: 'Remove Student',
      subHeader: 'Are you sure?',
      message: 'Are you sure you want to delete this student from the class?',
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

  async addAlert(userID: string, firstName: string, lastName: string) {
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
            this.addAlertConfirm(userID, firstName, lastName);
          }
        }
      ]
    });

    await alert.present();
  }

  async addAlertConfirm(userID: string, firstName: string, lastName: string)
  {
    // Register the student here
    await this.regService.registerStudent(userID, this.password, this.classID).toPromise();
    // await this.studentService.postStudentInfo(userID, firstName, lastName).toPromise();
    // await this.classService.postNewTakes(this.classID, userID).toPromise();
    await this.refreshStudents();
  }

}
