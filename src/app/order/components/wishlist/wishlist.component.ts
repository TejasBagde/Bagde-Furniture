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
  
  storeWishlistData: any[]=[];

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
        x.quantity = 1;
      this.storeWishlistData.push(x)
      }
    })
    // items.quantity = 1
    // this.orderService.subjectSendData(items);
  }


  goToCart(){
    this.orderService.subjectSendData(this.storeWishlistData);
    this.router.navigate(['/cart']);
  }

}
