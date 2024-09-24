import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [NgFor],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{

  wishlistList: any[] = [];
  constructor(){}

  ngOnInit(): void {
    this.wishlistList = JSON.parse(localStorage.getItem("wishlistList") || '{}');
  }

  removeItem(id: any){
    this.wishlistList = this.wishlistList.filter((x: any)=>id !== x.id);
  }

}
