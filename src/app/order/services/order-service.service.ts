import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  wishlistOrderData = new BehaviorSubject<[]>([]);
  homeWishlistData = new BehaviorSubject<[]>([]);

  constructor() {}

  subjectSendData(wishlist: any){
    this.wishlistOrderData.next(wishlist);
  }

  homeWishlistDataSend(wishlist: any){
    this.homeWishlistData.next(wishlist);
  }


}
