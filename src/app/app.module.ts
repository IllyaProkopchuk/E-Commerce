import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { MatInputModule } from '@angular/material/input';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { BasketComponent } from './basket/basket.component';
import { AboutComponent } from './pages/about/about.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminBrandComponent } from './admin/admin-brand/admin-brand.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsPipe } from './pipes/products.pipe';
import { BrandPipe } from './pipes/brand.pipe';
import { PricePipe } from './pipes/price.pipe';
import { SizePipe } from './pipes/size.pipe';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';


import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from './preloader-config';
import { UsersService } from './shared/services/users.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AddressComponent } from './dashboard/address/address.component';
import { OrderHistoryComponent } from './dashboard/order-history/order-history.component';
import { AdminFeedbackComponent } from './admin/admin-feedback/admin-feedback.component';
import { ProceedComponent } from './pages/proceed/proceed.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    ContactComponent,
    AdminComponent,
    LoginComponent,
    BasketComponent,
    AboutComponent,
    AdminCategoryComponent,
    AdminBrandComponent,
    AdminProductComponent,
    ProductsPipe,
    BrandPipe,
    PricePipe,
    SizePipe,
    ProductDetailsComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    DashboardComponent,
    ProfileComponent,
    AddressComponent,
    OrderHistoryComponent,
    AdminFeedbackComponent,
    ProceedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    FormsModule,
    Ng5SliderModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MaterialFileInputModule,
    MatIconModule,
    ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
  ],

  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }

