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
    this.wishlistList = JSON.parse(localStorage.getItem("wishlistList") || '{}');
  }

  removeItem(id: any){
    this.wishlistList = this.wishlistList.filter((x: any) => id !== x.id);
    localStorage.removeItem('wishlistList');
    localStorage.setItem('wishlistList', JSON.stringify(this.wishlistList));
  }

  addToCartData(items: any){
    items.quantity = 1
    this.orderService.subjectSendData(items);
    this.router.navigate(['/cart']);
  }

}
