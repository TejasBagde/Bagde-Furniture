import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidationService } from '../../../shared/components/services/validation-service/validation.service';
import { RouterModule } from '@angular/router';
import { OrderServiceService } from '../../services/order-service.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  addValue: number = 0;
  singleProductDetails: any = {};
  wishlistObject: any = {};
  wishlistArrayStore: any[] = [];
  identifyId: any;

  constructor(public validationService: ValidationService, private orderService: OrderServiceService){}

  ngOnInit(): void {
    
    const wishlistData = this.orderService.wishlistOrderData.getValue();
    const wishlistArrayStore = JSON.parse(localStorage.getItem("wishlistCartData") || '[]');

    if (wishlistData) {
        wishlistArrayStore.push(wishlistData);
        localStorage.setItem("wishlistCartData", JSON.stringify(wishlistArrayStore));
    }

    this.wishlistArrayStore = wishlistArrayStore;
    console.log("wishlistArrayStore", this.wishlistArrayStore);
  }

  decreesCart(id: number) {
    this.wishlistArrayStore.forEach((item: any) => {
      if (item.id === id && item.quantity > 0) {
        item.quantity--;  // Decrease the quantity of the specific item
      }
    });
    this.updateWishlistLocalStorage(); // Update localStorage if needed
  }
  
  increaseCart(id: number) {
    this.wishlistArrayStore.forEach((item: any) => {
      if (item.id === id && item.quantity < 999) {
        item.quantity++;  // Increase the quantity of the specific item
      }
    });
    this.updateWishlistLocalStorage(); // Update localStorage if needed
  }
  
  updateWishlistLocalStorage() {
    localStorage.setItem("wishlistCartData", JSON.stringify(this.wishlistArrayStore)); // Update localStorage
  }
  
  removeCart(id: number){
    this.wishlistArrayStore = this.wishlistArrayStore.filter((x)=> id !== x.id);
    this.updateWishlistLocalStorage(); // Update localStorage if needed
  }

}
