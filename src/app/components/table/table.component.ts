import { Component, OnInit } from '@angular/core';
import { FoodSale } from 'src/app/models/food-sale';
import { FoodSaleService } from 'src/app/services/food-sale.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { EditFoodSaleDialogComponent } from '../edit-food-sale-dialog/edit-food-sale-dialog.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  foodSales: FoodSale[] = [];
  sortedColumn: string = ''; // Track the currently sorted column
  sortDirection: string = 'asc'; // Track the sorting direction
  filterDate: string = ''; // Track the filter value for orderDate
  sortColumn(column: string): void {
    // If the clicked column is already sorted, reverse the sorting direction
    if (column === this.sortedColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If a different column is clicked, update the sortedColumn and reset the sorting direction
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    // Perform the actual sorting of the foodSales array based on the selected column and direction
    this.foodSales.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
  filterByDate(date: string): void {
    this.filterDate = date;
    
    // Perform the filtering based on the selected date
    if (date) {
      this.foodSales = this.foodSales.filter((sale) => {
        const saleDate = new Date(sale.orderDate).toISOString().substring(0, 10); // Convert to ISO string format (yyyy-mm-dd)
        return saleDate.startsWith(date);
      });
    } else {
      // If no date is selected, reset the filtering and display all foodSales
      this.foodSaleService.getTransactionFoodSales().subscribe((result: FoodSale[]) => {
        this.foodSales = result;
      });
    }
  }
  
  
  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  constructor(
    private foodSaleService: FoodSaleService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
    this.foodSaleService.getTransactionFoodSales().subscribe((result: FoodSale[]) => (this.foodSales = result));
  }

  editItem(item: FoodSale) {
    // Open a modal dialog with the item details and a form for editing
    // Bind the form inputs to the item properties using [(ngModel)]
  
    // Call your update service method when the user submits the form
    // Handle success and error cases with appropriate notifications
    
    // Example implementation:
    const dialogRef = this.dialog.open(EditFoodSaleDialogComponent, {
      data: item, // Pass the item to the dialog component
      width: '400px', // Set the desired dialog width
    });
  
    dialogRef.afterClosed().subscribe((result: FoodSale | undefined) => {
      if (result) {
        this.foodSaleService.updateTransactionFoodSale(result).subscribe(
          () => {
            console.log('Food sale updated successfully');
            // Display a success notification
            this.notificationService.success('Food sale updated successfully');
            // You can perform additional actions here, such as refreshing the food sales list
          },
          (error) => {
            console.log('Error updating food sale:', error);
            // Display an error notification
            this.notificationService.error('Failed to update food sale');
            // Handle the error, display an error message, etc.
          }
        );
      }
    });
  }
  
  deleteItem(item: any) {
    // Implement delete logic here
    console.log('Delete item:', item);
    // Call your delete service method here
    this.foodSaleService.deleteTransactionFoodSale(item.id).subscribe(() => {
      console.log('Food sale deleted successfully');
      // Remove the item from the foodSales array
      this.foodSales = this.foodSales.filter((sale) => sale.id !== item.id);
    });
  }
  
}
