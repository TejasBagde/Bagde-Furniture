import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidationService } from '../../../shared/components/services/validation-service/validation.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  addValue: number = 0;
  singleProductDetails: any = {};

  constructor(public validationService: ValidationService){}

  ngOnInit(): void {
    const singleProductDetails = localStorage.getItem("singleProduct");
    this.singleProductDetails = (JSON.parse(singleProductDetails || '{}'));
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
