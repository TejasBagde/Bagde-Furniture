import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  wishlistOrderData = new BehaviorSubject<[]>([]);

  constructor() {}

  subjectSendData(wishlist: any){
    this.wishlistOrderData.next(wishlist);
  }


}
