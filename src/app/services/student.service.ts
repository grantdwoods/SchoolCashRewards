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
  }

  postStudentInfo(userID: string, firstName: string, lastName: string)
  {
    var form = new FormData;
    form.append('userID', userID);
    form.append('firstName', firstName);
    form.append('lastName', lastName);
    this.httpClient.post('students.php', form);
    console.log('Student registered: ' + userID + ' ' + firstName + ' ' + lastName);
  }
  
}

    getStudentHistory(userID: string)
    {
        //gets a list of all transactions for the student with userID
        return this.httpClient.get('history.php?userID=' + userID);
    }//end getStudentHistory

    postStudentHistoryItem(userID: string, amount: number, comment: string, dateTime: string)
    {
        //calls the httpClient to add this transaction to the student
        //return this.httpClient.post('history.php ');
    }//end addStudentHistoryItem

    putStudentAward(userID: string, coupons: number)
    {
        //calls the httpClient to apply the award to the proper student
        //return this.httpClient.put('students.php?userID=' + userID + '&coupons=' + coupons);
    }//end updateStudentBalance
}//end class
