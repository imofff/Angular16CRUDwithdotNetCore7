import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoodSale } from 'src/app/models/food-sale';

@Component({
  selector: 'app-create-food-sale-dialog',
  templateUrl: './create-food-sale-dialog.component.html',
  styleUrls: ['./create-food-sale-dialog.component.css']
})
export class CreateFoodSaleDialogComponent {
  foodSale: FoodSale;
  totalPrice = 0;

  constructor(
    public dialogRef: MatDialogRef<CreateFoodSaleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FoodSale
  ) {
    this.foodSale = { ...data }; // Create a copy of the data object

    // Initialize the totalPrice if quantity and unitPrice are provided
    if (this.foodSale.quantity && this.foodSale.unitPrice) {
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    // Calculate the totalPrice as the product of quantity and unitPrice
    this.totalPrice = this.foodSale.quantity * this.foodSale.unitPrice;
    // Fix the totalPrice to 2 decimal places
    this.foodSale.totalPrice = Number((this.foodSale.unitPrice * this.foodSale.quantity).toFixed(2));
  }

  onQuantityChange() {
    this.calculateTotalPrice();
  }

  onUnitPriceChange() {
    this.calculateTotalPrice();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    this.dialogRef.close(this.foodSale);
  }
}
