import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HeaderComponent } from "../shared/components/header/header.component";
import { SingleProduct } from '../models/sofa-list-interface/sofaListInterface';
import { ApiService } from '../shared/components/services/api-service/api.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, CarouselModule, HeaderComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1200,
    margin: 20,
    navText: ['<i class="fa-solid fa-circle-arrow-left nav--icon--home"></i>', '<i class="fa-solid fa-circle-arrow-right nav--icon--home"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  wishlistArray: any[] = [];
  sofaList: any;

  singleDetailsList: SingleProduct[] = [];

  constructor(private apiService: ApiService, private router: Router){}

  ngOnInit(): void {
    this.fetchHomeItemsData();
  }

  async fetchHomeItemsData() {
    try{
      const data = await this.apiService.fetchHomeItemsData();
      this.sofaList = data;
      console.log(this.sofaList)
    }catch(error){
      console.log("error", error)
    }
  }
 
  showDetailsItem(item: any) {
    if (item !== '') {
      localStorage.setItem('singleProduct', JSON.stringify(item));
      this.router.navigate(['/product-details']);
    }else {
      this.router.navigate(['/home']);
    }
  }

  addWishlist(itemList: any) {
    const index = this.wishlistArray.findIndex((x: any) => x.id === itemList.id);
    if (index > -1) {
      this.wishlistArray.splice(index, 1);
      itemList.showHeartIcon = false;
    } else {
      const itemToAdd = this.sofaList.find((x: any) => x.id === itemList.id);
      if (itemToAdd) {
        this.wishlistArray.push(itemToAdd);
        itemList.showHeartIcon = true;
      }
    }
    console.log('Wishlist:', this.wishlistArray);
  }

}
