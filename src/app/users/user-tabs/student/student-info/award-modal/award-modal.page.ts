import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-award-modal',
  templateUrl: './award-modal.page.html',
  styleUrls: ['./award-modal.page.scss'],
})
export class AwardModalPage implements OnInit{
    constructor(private modalController: ModalController, private toastController: ToastController) { }
    @Input() currentCoupons: number; 
    private description: string;
    private awardAmount: number;

    ngOnInit(){}//end ngOnInit

    private closeModal()
    {
        //closes the modal and returns to the student's page
        this.modalController.dismiss();
    }//end closeModal

    private award()
    {
        if (isNullOrUndefined(this.awardAmount)) {
            this.awardAmount = 0;
            this.displayToast("You Must Enter a Number!", "danger");
        }
        else if (this.currentCoupons + this.awardAmount < 0)
            this.displayToast("Student's award balance cannot be negative!", "danger");
        else {
            //calculate the new balance
            var newBalance = this.currentCoupons + this.awardAmount;
            //update the student's coupon count
            this.updateCouponBalance(newBalance);
            //add this award to that student's history list along with description and current user name
            this.addToStudentHistory();
            //toast and close modal
            this.displayToast("Awarded " + newBalance + " awards to this student", "");
            console.log(this.awardAmount);
            this.closeModal();
        }

    }//end award

    private async displayToast(toastText: string, color: string)
    {
        const toast = await this.toastController.create({
            message: toastText,
            duration: 2000,
            color: color
        });
        toast.present();
    }//end displayToast

    private updateCouponBalance(newBalance: number) {
        console.log("Updating Student's balance to be " + newBalance);
    }//end updateCouponBalance

    private addToStudentHistory()
    {
        //
        console.log("Adding this transaction to student's history");
    }//end addToStudentHistory
}//end class
