import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, RowNode ,ColumnApi} from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { StockService } from 'src/shared/stock.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  http:any;
  constructor(private stockService: StockService,http: HttpClient)
  { 
    this.http=http;
  }
  public rowData = [{}];
  public gridApi:any;
  id=0;
 
  onAddRow(): void
  {
    this.stockService.gridApiGlobal.updateRowData({add:this.stockService.getrec()});
  }

  ngOnInit(): void {
 
  }
  
  onCellValueChanged(params: any) {
    this.stockService.set.add(params.node.id);
    
  }
  public autoGroupColumnDef: ColDef = {
      minWidth: 300
  };
  
  private listItems: Array<any> = [
      { text: "None", value: -1 },
      { text: "Delivery Truck", value: 0 },
      { text: "Regular Air", value: 1 },
      { text: "Express Air", value: 2 }
  ];
   columnDefs: ColDef[] = [
      { colId:'1',field: 'stockName',width: 110,resizable: true ,editable:true,suppressSizeToFit:true},
      { colId:'2',field: 'existingQuantity' ,width: 110,resizable: true,suppressSizeToFit:true,editable:true, aggFunc: 'sum', enableValue: true,
      allowedAggFuncs: ['sum','min','max'] },
      { colId:'3',field: 'averageCost',width: 110,resizable: true ,suppressSizeToFit:true},
      { colId:'4',field: 'investment',width: 110,resizable: true,suppressSizeToFit:true },
      { colId:'5',field: 'currentPrice',width: 120,resizable: true },
      { colId:'6',field: 'marketValue',width: 120,resizable: true},
      { colId:'7',field: 'unrealizedGainLoss' ,width: 150,resizable: true },
      { colId:'8',field: 'gainLoss' ,width: 100,resizable: true,suppressSizeToFit:true },
      { colId:'9',field: 'allocation',width: 100,resizable: true,suppressSizeToFit:true },
      { colId:'10',field: 'action',width: 90,cellEditor: 'agSelectCellEditor',
                                                                  cellEditorParams: {
                                                                  cellRenderer: 'agRichSelectCellEditor',
                                                                  cellHeight: 30,
                                                                  values: ['Buy','Sell']
                                                                  },
                                                                  editable: true
      
                
      },
      { colId:'11',field: 'qty',width: 70,resizable: true,suppressSizeToFit:true,editable:true },
      { colId:'12',field: 'recommendedAmount' ,width: 170,resizable: true ,suppressSizeToFit:true,editable:true},
      { colId:'13',field: 'newAllocation' ,width: 150,resizable: true,editable:true},
  ];

  

  private gridColumnApi!: ColumnApi;
  data:any;
  async  onGridReady(params:any) {
      this.gridApi = params.api;
      this.stockService.gridApiGlobal= this.gridApi;
      let data = await this.stockService.getDataSynchronous(1,'onGridReady');
      this.stockService.setGridRef(data.body);
      this.gridColumnApi = params.columnApi;
      setTimeout(()=>{
            let pinnedBottomData = this.generatePinnedBottomData();
            this.agGrid.api.setPinnedBottomRowData([
              pinnedBottomData 
          ]);
          }, 500)
  
      //  });
    }

  generatePinnedBottomData(){
    let list: string[] = [];

      this.gridApi.columnModel.columnDefs.forEach((item: { colId: string; }) => {
          list.push(item.colId);
       });
      return this.calculatePinnedBottomData(list);
  }
  calculatePinnedBottomData(target: any){
      console.log(target);
      let columnsWithAggregation = ['investment','marketValue','unrealizedGainLoss','gainLoss','allocation','recommendedAmount',
      'newAllocation'];
      console.log(columnsWithAggregation);
      columnsWithAggregation.forEach(element => {
        console.log('element', element);
        target[element]=0;
        this.agGrid.api.forEachNodeAfterFilter((rowNode: RowNode) => {
              if (rowNode.data[element])
              {
                  console.log(Number(rowNode.data[element]));
                  target[element] += Number(rowNode.data[element]);
              }
          });
      })
      target['stockName'] = 'Total';
      return target;
  }

  
}
