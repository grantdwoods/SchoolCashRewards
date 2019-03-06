import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController} from '@ionic/angular';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-award-modal',
  templateUrl: './award-modal.page.html',
  styleUrls: ['./award-modal.page.scss'],
})
export class AwardModalPage implements OnInit{
    constructor(private modalController: ModalController) { }
    @Input() history: object;
    date: Date;

    ngOnInit() {
        this.date = new Date(this.history.dtmDate);//ignore the red squiggly. It pulls the info for some reason despite it.
        console.log(this.date);
    }//end ngOnInit

    private closeModal()
    {
        //closes the modal and returns to the student's page
        this.modalController.dismiss();
    }//end closeModal

    private extractDate()
    {
        var ret = "0";
        if (!isNullOrUndefined(this.date))
        {
            ret = this.date.toLocaleDateString("en-US") + " @ ";
            ret += this.date.toLocaleTimeString("en-US"); 
        }
        return ret;
    }//end extractDate

}//end class
