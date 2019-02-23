import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-award-modal',
  templateUrl: './award-modal.page.html',
  styleUrls: ['./award-modal.page.scss'],
})
export class AwardModalPage implements OnInit{
    constructor(private modalController: ModalController, private toastController: ToastController) { }
    @Input() history: object;
    private month: string;
    private day: string;

    ngOnInit() {
        console.log(this.history);
        //this.month = history[0].dtmDate;
    }//end ngOnInit

    private closeModal()
    {
        //closes the modal and returns to the student's page
        this.modalController.dismiss();
    }//end closeModal

}//end class
