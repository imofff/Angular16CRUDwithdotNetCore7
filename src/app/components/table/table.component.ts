import { Component, OnInit } from '@angular/core';
import { FoodSale } from 'src/app/models/food-sale';
import { FoodSaleService } from 'src/app/services/food-sale.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  items: any[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
  foodSales: FoodSale[] = [];
  constructor(private foodSaleService: FoodSaleService) { }

  ngOnInit() {
    this.foodSales = this.foodSaleService.getTransactionFoodSales();
  }

  editItem(item: any) {
    // Implement edit logic here
    console.log('Edit item:', item);
  }

  deleteItem(item: any) {
    // Implement delete logic here
    console.log('Delete item:', item);
  }
}
