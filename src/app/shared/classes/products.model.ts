import { IProducts } from '../interfaces/products.interface';

export class Products implements IProducts{
    constructor(
        public id: number,
        public category: string, 
        public brand: string, 
        public name: string, 
        public description: string, 
        public price: number,
        public xs: boolean, 
        public s: boolean, 
        public m: boolean, 
        public l: boolean, 
        public xl: boolean,
        public photo: string,
    ){}
}