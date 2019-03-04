import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/Storage'

@Injectable({
  providedIn: 'root'
})
export class StudentService {

    constructor(private httpClient: HttpClient, private storage: Storage) { }

  getStudentInfo(userID: string)
  {
    return this.httpClient.get('students.php?userID=' + userID);
  }

  postStudentInfo(userID: string, firstName: string, lastName: string)
  {
    var form = new FormData;
    form.append('userID', userID);
    form.append('firstName', firstName);
    form.append('lastName', lastName);
    return this.httpClient.post('students.php', form);
    //console.log('Student registered: ' + userID + ' ' + firstName + ' ' + lastName);
  }
  
  getStudentHistory(userID: string)
  {
    //gets a list of all transactions for the student with userID
    return this.httpClient.get('history.php?userID=' + userID);
  }//end getStudentHistory

  postStudentHistoryItem(userID: string, amount: number, comment: string, dateTime: string)
  {
      //calls the httpClient to add this transaction to the student's history list
      let form = new FormData;
      form.append('amount', amount.toString());
      form.append('userID', userID);
      form.append('dateTime', dateTime);
      form.append('comment', comment);
      return this.httpClient.post('history.php', form, {});
  }//end addStudentHistoryItem

    putStudentAward(userID: string, coupons: number)
    {
        //userID is the id of the user being updated. coupons is the amount the award is being adjusted by.
        //calls the httpClient to apply the award to the proper student
        let body = `{"userID":"${userID}", "coupons":"${coupons}"}`;
        return this.httpClient.put('students.php', body, {});
    }//end updateStudentBalance

}//end class
