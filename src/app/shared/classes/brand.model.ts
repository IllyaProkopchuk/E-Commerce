import { IBrand } from '../interfaces/brand.interface';

export class Brand implements IBrand{
    constructor(
       public id: number,
       public name: string
    ){}
}