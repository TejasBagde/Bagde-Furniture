import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderServiceService } from './order/services/order-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'amanda-furniture';

  constructor(private orderService: OrderServiceService){}

  ngOnInit(): void {
    const homeData = JSON.parse(localStorage.getItem("getHomewishlistData") || '[]');
    if(homeData){
      this.orderService.homeWishlistData.next(homeData);
    }

    const wishlist = JSON.parse(localStorage.getItem("getWishlist") || '[]');
    if(wishlist){
      this.orderService.wishlistOrderData.next(wishlist);
    }

    const singleProduct = JSON.parse(localStorage.getItem("getSingleProduct") || '{}');
    if(singleProduct){
      this.orderService.singleProductData.next(singleProduct);
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  getWishlistData(){
    const homeData = this.orderService.homeWishlistData.getValue();
    localStorage.setItem("getHomewishlistData", JSON.stringify(homeData));

    const wishlist = this.orderService.wishlistOrderData.getValue();
    localStorage.setItem("getWishlist", JSON.stringify(wishlist));

    const singleProduct = this.orderService.singleProductData.getValue();
    localStorage.setItem("getSingleProduct", JSON.stringify(singleProduct));
  }

}
