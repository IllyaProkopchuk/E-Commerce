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
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SecureInnerPages } from './shared/guard/secure-inner-pages.guard.ts.guard';
import { AuthGuard } from './shared/guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AddressComponent } from './dashboard/address/address.component';
import { OrderHistoryComponent } from './dashboard/order-history/order-history.component';
import { AdminFeedbackComponent } from './admin/admin-feedback/admin-feedback.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent, canActivate: [SecureInnerPages] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [SecureInnerPages] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPages] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPages] },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'address', component: AddressComponent },
      { path: 'order-history', component: OrderHistoryComponent }
    ]
  },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'category', pathMatch: 'full' },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'brand', component: AdminBrandComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'feedback', component: AdminFeedbackComponent },

    ]
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
