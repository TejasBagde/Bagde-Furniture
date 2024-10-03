import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from '../../services/order-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{

  wishlistList: any[] = [];
  
  constructor(private orderService: OrderServiceService, private router: Router){}

  ngOnInit(): void {
    this.wishlistList = this.orderService.homeWishlistData.getValue();
  }

  removeItem(id: any){
    this.wishlistList = this.wishlistList.filter((x: any) => id !== x.id);
    this.orderService.homeWishlistDataSend(this.wishlistList);
  }

  addToCartData(id: any){
    this.wishlistList.forEach((x: any)=>{
      if(x.id == id){
      this.orderService.subjectSendData(x);
      this.router.navigate(['/cart']);
      }
    })

    // items.quantity = 1
    // this.orderService.subjectSendData(items);
  }

}
