import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

    getStudentInfo(userID: string)
    {
        return this.httpClient.get('students.php?userID=' + userID);
    }//end getStudentInfo

    getStudentHistory(userID: string)
    {
        //gets a list of all transactions for the student with userID
        return this.httpClient.get('history.php?userID=' + userID);
    }//end getStudentHistory

    addStudentHistoryItem(userID: string, amount: number, comment: string, dateTime: string)
    {
        //calls the httpClient to add this transaction to the student
        //return this.httpClient.
    }//end addStudentHistoryItem

    addAward(userID: string, coupons: number)
    {
        //calls the httpClient to apply the award to the proper student
        //return this.httpClient.put('students.php?userID=' + userID + '&coupons=' + coupons);
    }//end updateStudentBalance
}//end class
