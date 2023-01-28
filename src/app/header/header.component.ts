import { Component, OnInit } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { StockService } from 'src/shared/stock.service';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { AuthenticationService } from '../login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private stockService: StockService,
    
    private authenticationService: AuthenticationService)
   { }
  public userList=["Atul","Amit","Shishir","Sonu"];
  public CONS_SELECT_USER="Select User";
  public CONS_LAST_PURCHASE_BY_USER_ON="Last Purchase By User On";
  public CONS_Last_RECOMMENDATION_BY_SONU_ON="Last Recommendation By Sonu On";
  public SP_MONTHLY="SP/Monthly";
  isLoggedIn = false;

  ngOnInit(): void {
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    console.log('menu ->' + this.isLoggedIn);
  }
  handleLogout() {
    this.authenticationService.logout();
  }
}
