import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../../../services/student.service';
import { AwardModalPage } from '../award-modal/award-modal.page';
import { ModalController } from '@ionic/angular';
import { isArray } from 'util';

@Component({
  selector: 'app-history-component',
  templateUrl: './history-component.component.html',
  styleUrls: ['./history-component.component.scss']
})
export class HistoryComponentComponent implements OnInit
{
    historyInfo: object = [];
    @Input() userID: string;
    constructor(private activatedRoute: ActivatedRoute, private studentService: StudentService, private modalController: ModalController) { }

    ngOnInit()
    {
        //TODO: refactor to a toPromise() style
        //gets the list of history items for this student from the database
        this.studentService.getStudentHistory(this.userID).subscribe(
            historyJSON => {
                if (isArray(historyJSON)) //if the student has no history, then the historyJSON will come back with an error
                    this.historyInfo = historyJSON;
            },
            error => {
                console.log(error["error"]["err-message"]);
            });
        console.log(this.historyInfo);
    }//end ngOnInit

    async openModalView(history: object)
    {
        //opens a modal showing an enlarged view of the history item.
        if (isArray(this.historyInfo)) //if the historyInfo is an array, we can assume that the student has some history
        {                              //strangely, if this if check isn't here, you can still click on an invisible history item and throw errors.
            const modal = await this.modalController.create({
                component: AwardModalPage,
                componentProps: { history }
            });
            await modal.present();
            console.log("history item clicked");
        }
    }//end openModalView
}//end class
