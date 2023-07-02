import { Injectable } from '@angular/core';
import { FoodSale } from '../models/food-sale';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class FoodSaleService {
  private url = 'FoodSale';
  constructor(private http: HttpClient) {}

  public getTransactionFoodSales(): Observable<FoodSale[]> {
    return this.http.get<FoodSale[]>(`${environment.apiUrl}/${this.url}`);
  }
  public updateTransactionFoodSale(foodSale: FoodSale): Observable<FoodSale> {
    return this.http.put<FoodSale>(`${environment.apiUrl}/${this.url}/${foodSale.id}`, foodSale);
  }
  public deleteTransactionFoodSale(foodSaleId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${this.url}/${foodSaleId}`);
  }
  

  // public getTransactionFoodSales(): FoodSale[] {
  //   let transactionFoodSale = new FoodSale();
  //   transactionFoodSale.id = 1;
  //   transactionFoodSale.orderDate= new Date();
  //   transactionFoodSale.region = "Thai";
  //   transactionFoodSale.city = "Bangkok";
  //   transactionFoodSale.category = "Bars";
  //   transactionFoodSale.product = "Carrot";
  //   transactionFoodSale.quantity = 33;
  //   transactionFoodSale.unitPrice = 1.77;
  //   transactionFoodSale.totalPrice = transactionFoodSale.quantity * transactionFoodSale.unitPrice;

  //   return [transactionFoodSale];
  // }
}
