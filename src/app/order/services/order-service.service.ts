import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  wishlistOrderData = new BehaviorSubject<[]>([]);
  homeWishlistData = new BehaviorSubject<[]>([]);
  checkoutData = new BehaviorSubject<[]>([]);

  constructor() {}

  subjectSendData(wishlist: any){
    this.wishlistOrderData.next(wishlist);
  }

  homeWishlistDataSend(wishlist: any){
    this.homeWishlistData.next(wishlist);
  }

  checkoutDataSend(checkout: any){
    this.checkoutData.next(checkout);
  }

}
