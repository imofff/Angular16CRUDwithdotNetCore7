import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  success(message: string): void {
    // Display a success notification, e.g., using toast notifications
    console.log('Success:', message);
  }

  error(message: string): void {
    // Display an error notification, e.g., using toast notifications
    console.error('Error:', message);
  }
}
