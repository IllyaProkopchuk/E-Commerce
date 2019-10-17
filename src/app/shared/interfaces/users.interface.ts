export interface IUsers {
    uid: string;
    email: string;
    firstName: string;
    secondName: string;
    photoURL: string;
    emailVerified: boolean;
    gender: string;
    phone: string;
    country: string;
    city: string;
    street: string;
    buildingNumber: number;
    bag: Array<any>;
    orderHistory: Array<any>;
}