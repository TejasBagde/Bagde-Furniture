import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidationService } from '../../../shared/components/services/validation-service/validation.service';
import { Router, RouterModule } from '@angular/router';
import { OrderServiceService } from '../../services/order-service.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  wishlistArrayStore: any[] = [];
  totalCartAmount: number = 0;
  selectedAmount: number = 0;

  constructor(public validationService: ValidationService, private orderService: OrderServiceService, private router: Router){}

  ngOnInit(): void {
    this.wishlistArrayStore = this.orderService.wishlistOrderData.getValue();
    this.totalCartAmount = this.wishlistArrayStore.reduce((x, y)=>{
      return x + y.price
    }, 0);
  }

  decreesCart(id: number) {
    this.wishlistArrayStore.forEach((item: any) => {
      if (item.id === id && item.quantity > 0) {
        item.quantity--;
      }
    });
  }
  
  increaseCart(id: number) {
    this.wishlistArrayStore.forEach((item: any) => {
      if (item.id === id && item.quantity < 999) {
        item.quantity++;
      }
    });
  }
  
  removeCart(id: number){
    this.wishlistArrayStore = this.wishlistArrayStore.filter((x)=> id !== x.id);
    this.orderService.subjectSendData(this.wishlistArrayStore);
  }

  goCheckout(){
    this.orderService.checkoutDataSend(this.wishlistArrayStore);
    this.router.navigate(['/checkout']);
  }

}
