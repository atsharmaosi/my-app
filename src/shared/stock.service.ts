import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http:HttpClient) { }
  set: Set<string> = new Set<string>();
  private baseURL = "http://localhost:8102/api/stock/user/";
  
      gridApiGlobal:any;
      setGridRef(data:any)
      {
        this.gridApiGlobal.setRowData(data);
      }
      getData(id:any,callFrom:any) {
        return  this.http
        .get<any>(this.baseURL+id, {
          headers:{         
          "Access-Control-Allow-Headers": "*", // this will allow all CORS requests
          "Access-Control-Allow-Origin":"*",
          "Content-Type": "application/json" // this shows the expected content type

        },observe: 'response'
        });
     }
      getDataSynchronous(id:any,callFrom:any):Promise<any>{
       return this.getData(id,callFrom).toPromise()
     }
    addNewStocks()
    {
      const data = [];
      this.set.forEach( id => data.push(JSON.stringify(this.gridApiGlobal.getRowNode(id).data)));

      this.http.post<any>(this.baseURL+'createAndUpdate/', {
          headers:{         
          "Access-Control-Allow-Headers": "*", // this will allow all CORS requests
          "Access-Control-Allow-Origin":"*",
          "Content-Type": "application/json" // this shows the expected content type

        },observe: 'response'
        });
      this.set.clear();
    }

     getrec()
     {
        return[
          {stockName:"Enter Stock Name",
          existingQuantity:'0',
          action:'Buy',
          investment:'0',
          averageCost:'0',
          currentPrice:'0',
          marketValue:'0',
          unrealizedGainLoss:'0',
          gainLoss:'0',
          allocation:'0',
          qty:'0',
          recommendedAmount:'0',
          newAllocation:'0',
          createDate:'0',
          executionDate:'0'}
          ];
    }

  }
