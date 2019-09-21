import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { BasketComponent } from './basket/basket.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'products', component: ProductsComponent},
  {path:'contact', component: ContactComponent},
  {path:'admin', component: AdminComponent},
  {path:'login', component: LoginComponent},
  {path:'basket', component: BasketComponent},
  {path:'about', component: AboutComponent},
  {path:'**', redirectTo: '/home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
