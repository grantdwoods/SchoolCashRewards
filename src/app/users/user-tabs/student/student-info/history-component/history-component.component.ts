import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../../../services/student.service';

@Component({
  selector: 'app-history-component',
  templateUrl: './history-component.component.html',
  styleUrls: ['./history-component.component.scss']
})
export class HistoryComponentComponent implements OnInit {
    historyInfo: object = [];
    @Input() userID: string;

    constructor(private activatedRoute: ActivatedRoute, private studentService: StudentService) { }

    ngOnInit()
    {
        //gets the list of history items for this student from the database
        this.studentService.getStudentHistory(this.userID).subscribe(
            historyJSON => {
                this.historyInfo = historyJSON;
            },
            error => {
                console.log(error["error"]["err-message"]);
            });
    }//end ngOnInit

    openModalView()
    {
        //opens a modal showing an enlarged view of the history item.
        console.log("history item clicked");
    }//end openModalView
}//end class
