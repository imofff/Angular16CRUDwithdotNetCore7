import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FoodSale } from 'src/app/models/food-sale';

@Component({
  selector: 'app-edit-food-sale-dialog',
  templateUrl: './edit-food-sale-dialog.component.html',
  styleUrls: ['./edit-food-sale-dialog.component.css'],
})
export class EditFoodSaleDialogComponent {
  foodSale: FoodSale;
  totalPrice = 0; // Initialize totalPrice to 0

  constructor(
    public dialogRef: MatDialogRef<EditFoodSaleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FoodSale
  ) {
    // Make a copy of the data to avoid modifying the original object
    this.foodSale = { ...data };
    this.calculateTotalPrice();
  }

  onSaveClick(): void {
    // Perform any necessary validation or data manipulation here
    // For example, you can send an HTTP request to update the food sale
    // Once the update is successful, close the dialog and pass the updated food sale back
    this.dialogRef.close(this.foodSale);
  }

  onCancelClick(): void {
    // If the user cancels the edit, simply close the dialog without making any changes
    this.dialogRef.close();
  }

  calculateTotalPrice(): void {
    // Calculate the Total Price based on the current Unit Price and Quantity
    this.foodSale.totalPrice = parseFloat((this.foodSale.unitPrice * this.foodSale.quantity).toFixed(2));
  }

  onUnitPriceChange(): void {
    this.calculateTotalPrice();
  }

  onQuantityChange(): void {
    this.calculateTotalPrice();
  }
}
