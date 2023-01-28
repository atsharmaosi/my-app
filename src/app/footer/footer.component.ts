import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { StockService } from 'src/shared/stock.service';
import { DataGridComponent } from '../shared/data-grid/data-grid.component'; 

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Output() someEvent = new EventEmitter
  public CONS_FOOTER_RECOMMENDATION_MONTH='Recommendation Month:';
  
  onAddRow(): void {
      this.dataGrid.onAddRow();
  }
  SubmitStock(): void {
    this.stockService.addNewStocks();
  }
  ngOnInit(): void {
  }

  constructor(private stockService: StockService,private dataGrid: DataGridComponent)
   { }
   curdate = (new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString();
}
