import { IUsers } from '../interfaces/users.interface';
export class Users implements IUsers {
    constructor(
        public id: number,
        public firstName: string,
        public secondName: string,
        public age: number,
        public email: string,
        public password: string,
        public country: string,
        public city: string,
        public street: string,
        public buildingNumber: number,
        public phone: string,
        public login: boolean,
        public bag: Array<any>
        ){}
}
