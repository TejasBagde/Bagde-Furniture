import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ProductDetailsComponent } from './shared/components/product-details/product-details.component';
import { CartComponent } from './order/components/cart/cart.component';
import { CheckoutComponent } from './order/components/checkout/checkout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { WishlistComponent } from './order/components/wishlist/wishlist.component';
import { OrderSuccessComponent } from './order/components/order-success/order-success.component';
import { OrderFailComponent } from './order/components/order-fail/order-fail.component';
import { TrackMyOrderComponent } from './order/components/track-my-order/track-my-order.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'order-fail', component: OrderFailComponent },
  { path: 'track-my-order', component: TrackMyOrderComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
  // { path: 'not-found', component: NotFoundComponent },
];
