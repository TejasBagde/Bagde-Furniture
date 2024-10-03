import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HeaderComponent } from "../shared/components/header/header.component";
import { SingleProduct } from '../models/sofa-list-interface/sofaListInterface';
import { ApiService } from '../shared/components/services/api-service/api.service';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderServiceService } from '../order/services/order-service.service';

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

  customOptions1: OwlOptions = {
    loop: true,
    autoplay: true,
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
        items: 4.5
      }
    },
    nav: true
  }

  wishlistArray: any[] = [];
  sofaList: any = [];
  bedList: any = [];
  miniHomeBoxList: any = [];
  singleDetailsList: SingleProduct[] = [];
  userIdentify: any;

  wishlistLength:any[] = [];

  constructor(private apiService: ApiService, private router: Router, private toster: ToastrService, private orderservice: OrderServiceService){}

  ngOnInit(): void {
    this.fetchHomeItemsData();
    this.fetchHomeBedData();
    this.fetchHomeMiniBox();

    const userIdentify: any = localStorage.getItem("loginUser");
    this.userIdentify = (JSON.parse(userIdentify));

    this.wishlistArray = this.orderservice.homeWishlistData.getValue(); //get value of wishlist
  }     

  async fetchHomeItemsData() {
    try{
      const data = await this.apiService.fetchHomeItemsData();
      this.sofaList = data;
    }catch(error){
      console.log("error", error)
    }
  }

  async fetchHomeBedData(){
    try{
      const data = await this.apiService.fetchHomeBedData();
      this.bedList = data;
    }catch(error){
      console.log("error", error)
    }
  }

  async fetchHomeMiniBox(){
    try{
      const data = await this.apiService.fetchHomeMiniBox();
      this.miniHomeBoxList = data;
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
    if(this.userIdentify){
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
      this.orderservice.homeWishlistDataSend(this.wishlistArray);
    }else{
      this.toster.error("Please login first");
    }
  }

}


