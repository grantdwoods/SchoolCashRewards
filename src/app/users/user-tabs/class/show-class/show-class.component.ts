import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { ClassService } from '../../../../services/class.service';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-show-class',
  templateUrl: './show-class.component.html',
  styleUrls: ['./show-class.component.scss']
})
export class ShowClassComponent implements OnInit {

  constructor(
    private studentService: StudentService, 
    private classService: ClassService, 
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  students$: any = [];
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
  }

  routeToStudent(strStudentID: string)
  {
    this.router.navigateByUrl('user-tabs/student/student-info/' + strStudentID);
  }

  async editClassCoupons()
  {
    //creates an alert window that handles the awarding of coupons
    const alert = await this.alertController.create({
      header: 'Edit coupons',
      backdropDismiss: false,
      inputs: [
        {
            name: 'awardAmount',
            id: 'num-award',
            type: 'number',
            value: 0,
            min: -10000,
            max: 10000
        },
        {
            name: 'awardDescription',
            id: 'txt_desc',
            type: 'text',
            placeholder: 'Description (optional)',
            value: "",
            //a max length does not exist as far as I know
        }
      ],
        buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Add/remove coupons',
          handler: data => {
            //check if the user didn't enter a number.
            //Note: the 0 on alert startup is NaN for some reason
            if (isNaN(parseInt(data.awardAmount)))
            {
              this.displayToast("Error: Invalid Award Amount", "danger");
              console.log("undefined award count");
              return false; //this prevents the alert from closing
            }
            //check if the balance will be < 0. If so, alert the user
            else if (this.classCoupons$ + parseInt(data.awardAmount) < 0) {
              this.displayToast("Error: Class would have negative awards!", "danger");
              console.log("negative balance");
              return false;
            }
            //everything should check out. process the stuff
            else {
              this.handleAward(parseInt(data.awardAmount), data.awardDescription);
            }
          }
        }
      ],
    });//end alert creation
    await alert.present();
    //refresh the page when the alert is dismissed
    await alert.onDidDismiss().then(() => {
        //refresh the page
        //this.refreshPage();
    });
  }

  private handleAward(award: number, description: string)
  {
    //update the student's coupon count
    this.updateBalance(award);
    //toast
    this.displayToast("Awarding " + award + " awards to " + this.className$, "");
  }//end handleAward

  private updateBalance(award: number)
  {
    //makes a database request to update this student's award count
    let data1 = this.classService.putClassAwards(this.classID$, award).toPromise();
    console.log("Processed award. Current balance is: " + this.classCoupons$);
  }//end updateBalance

  private async displayToast(toastText: string, color: string)
  {
      const toast = await this.toastController.create({
          message: toastText,
          duration: 2000,
          color: color
      });
      toast.present();
  }//end displayToast

}
