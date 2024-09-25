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
    console.log(this.wishlistArrayStore);
  }

  decreesCart(){
    if(this.addValue >= 1){
      this.addValue --
    }
  }

  increaseCart(){
    if(this.addValue <= 999){
      this.addValue ++
    }
  }

  removeCart(id: any){
    this.wishlistArrayStore = this.wishlistArrayStore.filter((x: any)=> x.id !== id);
  }

}
