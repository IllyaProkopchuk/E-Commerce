import { IOrder } from '../interfaces/order.interface';

export class Order implements IOrder {
    constructor(
        public id: number,
        public firstName: string,
        public secondName: string,
        public country: string,
        public city: string,
        public street: string,
        public buildingNumber: number,
        public phone: string,
        public productsArray: any[]
    ) { }
}