import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import {FormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { StockService } from '../shared/stock.service'
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpInterceptorService } from './http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DataGridComponent } from './shared/data-grid/data-grid.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, DatePickerComponent,
     LoginComponent, LogoutComponent, DataGridComponent],
  imports: [BrowserModule,FormsModule,AgGridModule.withComponents([]), MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,HttpClientModule,AppRoutingModule],
  providers: [StockService,DataGridComponent,
  {
    provide: HTTP_INTERCEPTORS,
    useClass:HttpInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}