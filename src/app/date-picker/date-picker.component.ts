import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StockService } from 'src/shared/stock.service';
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {

  name = 'Angular 6';
  Students = {
    dob: ''
  }

  checkDate() {
    const dateSendingToServer = new DatePipe('en-US').transform(this.Students.dob, 'dd/MM/yyyy')
    console.log(dateSendingToServer);
  } 

}
