import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../../services/student.service';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { AwardModalPage } from './award-modal/award-modal.page';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

    userID: string;
    studentInfo: object = [];
    constructor(private activatedRoute: ActivatedRoute, private studentService: StudentService, private modalController: ModalController, private alertController: AlertController, private toastController: ToastController) { }

    ngOnInit()
    {
        this.userID = this.activatedRoute.snapshot.paramMap.get('id');

        this.studentService.getStudentInfo(this.userID).subscribe(
            studentInfo =>{
                this.studentInfo = studentInfo;
            },
                error => {
                console.log(error["error"]["err-message"]);
            });
    }//end ngOnInit

    async awardCoupons()
    {
        const modal = await this.modalController.create({
            component: AwardModalPage,
            componentProps: {currentCoupons: this.studentInfo[0].intCoupons}
        });
        console.log("Awarding coupons to " + this.studentInfo[0].strFirstName + " " + this.studentInfo[0].strLastName +" ("+this.studentInfo[0].intCoupons+")");
        return await modal.present();

        //refresh the page to show that the student has the transaction applied

    }//end awardCoupons

    async awardCouponsWithAlert()
    {
        //creates an alert window that handles the awarding of coupons
        const alert = await this.alertController.create({
            header: 'Award!',
            backdropDismiss: false,
            inputs: [
                {
                    name: 'awardAmount',
                    id: 'num-award',
                    type: 'number',
                    value: 0,
                    min: -50,
                    max: 50
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
                    text: 'Award!',
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
                        else if (this.studentInfo[0].intCoupons + parseInt(data.awardAmount) < 0) {
                            this.displayToast("Error: Student would have negative awards!", "danger");
                            console.log("negative balance");
                            return false;
                        }
                        //everything should check out. process the stuff
                        else {
                            this.handleAward(parseInt(data.awardAmount), data.description);
                        }
                    }
                }
            ],
        });//end alert creation
        await alert.present();
    }//end awardCouponsWithAlert

    private handleAward(award: number, description: string)
    {
        var balance = this.studentInfo[0].intCoupons + award;
        //update the student's coupon count
        this.updateBalance(balance);
        //add transaction to award history
        this.logTransaction(award, description);
        //toast
        var studentName = this.studentInfo[0].strFirstName + " " + this.studentInfo[0].strLastName;
        this.displayToast("Awarding " + balance + " awards to " + studentName, "");
        console.log("processing award: " + balance);
        //refresh page to show transaction has occured
    }//end handleAward

    private updateBalance(newBalance: number)
    {
        //makes a database request to update this student's award count
    }//end updateBalance

    private logTransaction(awardAmount: number, description: string)
    {
        //makes a database request to add this transaction to this student's history list
        //TODO: get this user's name and verify date format.
        var currentTime = new Date();
        console.log("Logging transaction with " + awardAmount + " awards and description of: \n" + description + "\n on " + currentTime);
    }//end logTransaction

    private async displayToast(toastText: string, color: string)
    {
        const toast = await this.toastController.create({
            message: toastText,
            duration: 2000,
            color: color
        });
        toast.present();
    }//end displayToast
}//end class
