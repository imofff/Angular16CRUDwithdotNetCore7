export class FoodSale {
    id?: number;
    orderDate= new Date();
    region = "";
    city = "";
    category = "";
    product = "";
    quantity = 0;
    unitPrice = 0;
    totalPrice = 0;
    [key: string]: any;
}