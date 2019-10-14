// export interface IUsers{
//     id: number;
//     firstName: string;
//     secondName: string;
//     age: number;
//     email: string;
//     password: string;
//     country: string;
//     city: string;
//     street: string;
//     buildingNumber: number;
//     phone: string;
//     bag: Array<any>;
//     login: boolean;
// }
export interface IUsers {
    uid: string;
    email: string;
    displayName: string;
    secondName: string;
    photoURL: string;
    emailVerified: boolean;
    gender: string;
}