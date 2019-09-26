import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { BasketComponent } from './basket/basket.component';

import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminBrandComponent } from './admin/admin-brand/admin-brand.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'products', component: ProductsComponent},
  {path:'contact', component: ContactComponent},
  {path:'login', component: LoginComponent},
  {path:'basket', component: BasketComponent},
  {path:'about', component: AboutComponent},
  {path:'admin', component: AdminComponent, children:[
    {path:'', redirectTo: 'category', pathMatch: 'full'},
    {path:'category', component: AdminCategoryComponent},
    {path:'brand', component: AdminBrandComponent},
    {path:'product', component: AdminProductComponent},

  ]},
  {path:'**', redirectTo: '/home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
