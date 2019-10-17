import { IUsers } from '../interfaces/users.interface';

export class Users implements IUsers {
    constructor(
        public uid: string,
        public email: string,
        public firstName: string,
        public secondName: string,
        public photoURL: string,
        public emailVerified: boolean,
        public gender: string,
        public phone: string,
        public country: string,
        public city: string,
        public street: string,
        public buildingNumber: number,
        public bag: Array<any>,
        public orderHistory: Array<any>
    ) { }
}