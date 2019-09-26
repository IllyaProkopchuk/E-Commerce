import { ICategory } from '../interfaces/category.inteface';

export class Category implements ICategory{
    constructor(
        public id: number,
        public name: string
    ){}
}

//ng g s shared/services/category