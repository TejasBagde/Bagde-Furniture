import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HeaderComponent } from "../header/header.component";
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ValidationService } from '../services/validation-service/validation.service';
import { RouterModule } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule, HeaderComponent, NgFor, CommonModule, FormsModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  // animations: [trigger('hoverState', [
  //   state('default', style({
  //     opacity: '1',
  //   })),
  //   state('HoverShow', style({
  //     // opacity: '1',
  //     // position: 'absolute',
  //     // top: '0%',
  //     // left: '0%',
  //     // width: '100%',
  //     // height: '100%',
  //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //     zIndex: '1027',
  //     marginTop: '70px',
  //   })),
  //   transition('* => *', [animate('0.3s')]),
  // ],)],
})
export class ProductDetailsComponent {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 20,
    navText: ['<i class="fa-solid fa-arrow-left fa-2xl prod-details-nav-arrow"></i>', '<i class="fa-solid fa-arrow-right fa-2xl prod-details-nav-arrow"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true,
    startPosition: 0 // Start at the first image by default
  }

  singleProductCaro: any[] = [
    {id: 1, Image: 'assets/single-product-img/1.jpg'},
    {id: 2, Image: 'assets/single-product-img/2.jpg'},
    {id: 3, Image: 'assets/single-product-img/3.jpg'},
    {id: 4, Image: 'assets/single-product-img/4.jpg'},
    {id: 5, Image: 'assets/single-product-img/5.jpg'},
    {id: 6, Image: 'assets/single-product-img/6.jpg'},
    {id: 7, Image: 'assets/single-product-img/7.jpg'},
    {id: 8, Image: 'assets/single-product-img/8.jpg'},
  ];
 
  singleProductDetails: any = {};
  showModalImage: boolean = false;
  addWishList: boolean = false;
  addValue: number = 0;

  HoverShow: any = 'default';

  constructor(public validationService: ValidationService){}
 
  ngOnInit(): void {
    const singleProductDetails = localStorage.getItem("singleProduct");
    this.singleProductDetails = (JSON.parse(singleProductDetails || '{}'));
  }

  showModal(){
    let showUpdateModal = document.getElementById('singleProduct');
    let CreateModal = new bootstrap.Modal(showUpdateModal);
    CreateModal.show();
    setTimeout(() => {
      this.showModalImage = true;
    }, 300);
  }

  setCarouselIndex(index: number) {
    this.customOptions = { ...this.customOptions, startPosition: index };
  }

  addToWishlist(){
    this.addWishList = !this.addWishList;
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




}
