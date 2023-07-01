import { Injectable } from '@angular/core';
import { FoodSale } from '../models/food-sale';

@Injectable({
  providedIn: 'root',
})
export class FoodSaleService {
  constructor() {}

  public getTransactionFoodSales(): FoodSale[] {
    let transactionFoodSale = new FoodSale();
    transactionFoodSale.id = 1;
    transactionFoodSale.orderDate= new Date();
    transactionFoodSale.region = "Thai";
    transactionFoodSale.city = "Bangkok";
    transactionFoodSale.category = "Bars";
    transactionFoodSale.product = "Carrot";
    transactionFoodSale.quantity = 33;
    transactionFoodSale.unitPrice = 1.77;
    transactionFoodSale.totalPrice = transactionFoodSale.quantity * transactionFoodSale.unitPrice;

    return [transactionFoodSale];
  }
}
