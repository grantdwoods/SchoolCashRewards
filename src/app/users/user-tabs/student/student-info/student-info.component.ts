import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../../services/student.service';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { AwardModalPage } from './award-modal/award-modal.page';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

    userID: string;
    studentInfo: Observable<object>;
    historyInfo: Observable<object>;
    coupons: number;
    fName: string;
    lName: string;
    constructor(private activatedRoute: ActivatedRoute, private studentService: StudentService, private modalController: ModalController, private alertController: AlertController, private toastController: ToastController) { }

    ngOnInit()
    {
       
        this.userID = this.activatedRoute.snapshot.paramMap.get('id');
        this.historyInfo = this.studentService.getStudentHistory(this.userID);
        this.studentInfo = this.studentService.getStudentInfo(this.userID);
        this.studentInfo.subscribe((data) => {
            console.log(data[0]);
            this.coupons = data[0].intCoupons;
            this.fName = data[0].strFirstName;
            this.lName = data[0].strLastName;
            console.log(this.fName + " " + this.lName + ": " + this.coupons);
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
                        else if (this.coupons + parseInt(data.awardAmount) < 0) {
                            this.displayToast("Error: Student would have negative awards!", "danger");
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
    }//end awardCouponsWithAlert

    private handleAward(award: number, description: string)
    {
        //update the student's coupon count
        this.updateBalance(award);
        //add transaction to award history
        this.logTransaction(award, description);
        //toast
        var studentName = this.fName + " " + this.lName;
        this.displayToast("Awarding " + award + " awards to " + studentName, "");
    }//end handleAward

    private updateBalance(award: number)
    {
        //makes a database request to update this student's award count
        this.studentService.putStudentAward(this.userID, award).subscribe(() => this.studentInfo = this.studentService.getStudentInfo(this.userID));
        console.log("Processed award. Current balance is: " + this.coupons);
    }//end updateBalance

    private logTransaction(awardAmount: number, description: string)
    {
        debugger;
        //makes a database request to add this transaction to this student's history list
        var currentTime = new Date();
        console.log(currentTime.toJSON());
        //year month day
        let dateTime: string = `${currentTime.getFullYear()}-${currentTime.getMonth()+1}-${currentTime.getDate()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
        console.log("DATETIME: " + dateTime);
        console.log("Logging transaction with " + awardAmount + " awards and description of: \n" + description + "\n on " + dateTime);
        
        this.studentService.postStudentHistoryItem(this.userID, awardAmount, description, dateTime).subscribe(()=> 
        this.historyInfo = this.studentService.getStudentHistory(this.userID));
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

    private refreshPage(event)
    {
        
        console.log("refreshing page");
        setTimeout(() => {
            console.log("refresh has ended");
            event.target.complete();
        }, 2000);
    }//end refreshPage
}//end class
