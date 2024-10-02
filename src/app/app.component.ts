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
    const storeData = localStorage.getItem("getWishlistData");
    if(storeData){
      this.orderService.wishlistOrderData.next(JSON.parse(storeData));
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  getWishlistData(){
    const data = this.orderService.wishlistOrderData.getValue();
    localStorage.setItem("getWishlistData", JSON.stringify(data));
  }

}
