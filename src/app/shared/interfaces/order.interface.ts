export interface IOrder{
    id: number;
    firstName: string;
    secondName: string;
    country: string;
    city: string;
    street: string;
    buildingNumber: number;
    phone: string;
    productsArray: Array<any>;
}