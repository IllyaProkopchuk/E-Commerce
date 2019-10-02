import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IProducts } from 'src/app/shared/interfaces/products.interface';
import { ProductsService } from 'src/app/shared/services/products.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productId: string;
  view: any;

  constructor(
    private productsSerice: ProductsService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.getMoreDetails();
  }

  ngOnInit() {
  }

  public getMoreDetails() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productsSerice.getOneProduct(this.productId).subscribe(
      data => {
        this.view = data.payload.data();
        console.log(this.view);
      }
    );
  }

  public goBack(): void{
    this.location.back();
  }

}

