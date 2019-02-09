import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../../services/student.service';
import { ModalController } from '@ionic/angular';
import { AwardModalPage } from './award-modal/award-modal.page';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

  userID: string;
    studentInfo: object = [];
    constructor(private activatedRoute: ActivatedRoute, private studentService: StudentService, private modalController: ModalController) { }

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
}//end class
