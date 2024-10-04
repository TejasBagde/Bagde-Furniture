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

  totalCartAmount: number = 0

  constructor(public validationService: ValidationService, private orderService: OrderServiceService){}

  ngOnInit(): void {
    this.wishlistArrayStore = this.orderService.wishlistOrderData.getValue();
    this.totalCartAmount = this.wishlistArrayStore.reduce((x, y)=>{
      return x + y.price
    }, 0);
  }

  decreesCart(id: number) {
    this.wishlistArrayStore.forEach((item: any) => {
      if (item.id === id && item.quantity > 0) {
        item.quantity--;  // Decrease the quantity of the specific item
      }
    });
  }
  
  increaseCart(id: number) {
    this.wishlistArrayStore.forEach((item: any) => {
      if (item.id === id && item.quantity < 999) {
        item.quantity++;  // Increase the quantity of the specific item
      }
      this.orderService.subjectSendData(this.wishlistArrayStore);
    });
  }
  
  removeCart(id: number){
    this.wishlistArrayStore = this.wishlistArrayStore.filter((x)=> id !== x.id);
    this.orderService.subjectSendData(this.wishlistArrayStore);
  }

}
