import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { debounceTime, Subject, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [trigger('hoverState', [
    state('default', style({
      opacity: '0',
    })),
    state('HoverShow', style({
      opacity: '1',
      // marginTop: '20px',
    })),
    transition('* => *', [animate('0.3s')]),
  ],)],
})
export class HeaderComponent {

  navbar: any[] = ["Shop", "About", "Services", "Blog", "Contact Us"];
 
  miniNav: any[] = ['Sofas', 'Living', 'Bedroom', 'D&K', 'Storage', 'Study & Office', 'Lamps & Lightings', 'Furnishings', 'Outdoor'];
 
  sofas: any[] = [
    ['Fabric Sofas', 'Wooden Sofas', '3 Seater Sofas', '2 Seater Sofas', '1 Seater Sofas'],
    ['Wingback Chairs', 'Lounge Chairs', 'Loveseats', 'Ottomans', 'Armchairs'],
    ['Wooden Sofa Cum Beds', 'Fabric Sofa Cum Beds', 'Sofa Cum Beds']
  ];
 
  living: any[] = [
    ['TV Units', 'Bookshelves', 'Display Unite', 'Magazine Racks', 'Shoe Racks', 'Wall Shelves', 'Trunk & Blanketbox'],
    ['Fabric Sofas', 'Wooden Sofas', '3 Seater Sofas', '2 Seater Sofas', '1 Seater Sofas', 'L Shaped Sofas', 'Leather Sofa', 'Diwaans', 'Futons'],
    ['Wingback Chairs', 'Lounge Chairs', 'Loveseats', 'Ottomans', 'Armchairs', 'Metal Chairs', 'Office Chairs', 'Gaming Chairs', 'Wingback Chairs', 'Lounge Chairs', 'Loveseats', 'Ottomans', 'Armchairs', 'Metal Chairs', 'Office Chairs', 'Gaming Chairs'],
    ['Coffee Tables', 'Office Tables', 'Coffee Table Sets', 'Nest Of Tables', 'Side & End Tables', 'Laptop Tables', 'Console Tables'],
    ['TV Units', 'Bookshelves', 'Display Unite', 'Magazine Racks', 'Shoe Racks', 'Wall Shelves', 'Trunk & Blanketbox'],
    ['Fabric Sofas', 'Wooden Sofas', '3 Seater Sofas', '2 Seater Sofas', '1 Seater Sofas', 'L Shaped Sofas', 'Leather Sofa', 'Diwaans', 'Futons'],
    ['Wingback Chairs', 'Lounge Chairs', 'Loveseats', 'Ottomans', 'Armchairs', 'Metal Chairs', 'Office Chairs', 'Gaming Chairs', 'Wingback Chairs', 'Lounge Chairs', 'Loveseats', 'Ottomans', 'Armchairs', 'Metal Chairs', 'Office Chairs', 'Gaming Chairs'],
    ['Coffee Tables', 'Office Tables', 'Coffee Table Sets', 'Nest Of Tables', 'Side & End Tables', 'Laptop Tables', 'Console Tables'],
  ]      
 
  bedroom: any[] = [
    ['TV Units', 'Bookshelves', 'Display Unite', 'Magazine Racks', 'Shoe Racks', 'Wall Shelves', 'Trunk & Blanketbox'],
    ['Fabric Sofas', 'Wooden Sofas', '3 Seater Sofas', '2 Seater Sofas', '1 Seater Sofas', 'L Shaped Sofas', 'Leather Sofa', 'Diwaans', 'Futons'],
    ['Wingback Chairs', 'Lounge Chairs', 'Loveseats', 'Ottomans', 'Armchairs', 'Metal Chairs', 'Office Chairs', 'Gaming Chairs'],
    ['Coffee Tables', 'Office Tables', 'Coffee Table Sets', 'Nest Of Tables', 'Side & End Tables', 'Laptop Tables', 'Console Tables'],
  ]
 
  dinningKitchen: any[] = [
    ['Dinning Kitchen', 'Bookshelves', 'Display Unite', 'Magazine Racks', 'Shoe Racks', 'Wall Shelves', 'Trunk & Blanketbox'],
    ['Fabric Sofas', 'Wooden Sofas', '3 Seater Sofas', '2 Seater Sofas', '1 Seater Sofas', 'L Shaped Sofas', 'Leather Sofa', 'Diwaans', 'Futons'],
    ['Wingback Chairs', 'Lounge Chairs', 'Loveseats', 'Ottomans', 'Armchairs', 'Metal Chairs', 'Office Chairs', 'Gaming Chairs'],
    ['Coffee Tables', 'Office Tables', 'Coffee Table Sets', 'Nest Of Tables', 'Side & End Tables', 'Laptop Tables', 'Console Tables'],
  ]
 
  storage: any[] = [
    ['Storage', 'Bookshelves', 'Display Unite', 'Magazine Racks', 'Shoe Racks', 'Wall Shelves', 'Trunk & Blanketbox'],
    ['Fabric Sofas', 'Wooden Sofas', '3 Seater Sofas', '2 Seater Sofas', '1 Seater Sofas', 'L Shaped Sofas', 'Leather Sofa', 'Diwaans', 'Futons'],
    ['Wingback Chairs', 'Lounge Chairs', 'Loveseats', 'Ottomans', 'Armchairs', 'Metal Chairs', 'Office Chairs', 'Gaming Chairs'],
    ['Coffee Tables', 'Office Tables', 'Coffee Table Sets', 'Nest Of Tables', 'Side & End Tables', 'Laptop Tables', 'Console Tables'],
  ]
 
  studyOffice: any[] = [
    ['Study & Office', 'Bookshelves', 'Display Unite', 'Magazine Racks', 'Shoe Racks', 'Wall Shelves', 'Trunk & Blanketbox'],
    ['Fabric Sofas', 'Wooden Sofas', '3 Seater Sofas', '2 Seater Sofas', '1 Seater Sofas', 'L Shaped Sofas', 'Leather Sofa', 'Diwaans', 'Futons'],
    ['Wingback Chairs', 'Lounge Chairs', 'Loveseats', 'Ottomans', 'Armchairs', 'Metal Chairs', 'Office Chairs', 'Gaming Chairs'],
    ['Coffee Tables', 'Office Tables', 'Coffee Table Sets', 'Nest Of Tables', 'Side & End Tables', 'Laptop Tables', 'Console Tables'],
  ]
 
  lampsLightings: any[] = [
    ['Lamps & Lightings', 'Bookshelves', 'Display Unite', 'Magazine Racks', 'Shoe Racks', 'Wall Shelves', 'Trunk & Blanketbox'],
    ['Fabric Sofas', 'Wooden Sofas', '3 Seater Sofas', '2 Seater Sofas', '1 Seater Sofas', 'L Shaped Sofas', 'Leather Sofa', 'Diwaans', 'Futons'],
    ['Wingback Chairs', 'Lounge Chairs', 'Loveseats', 'Ottomans', 'Armchairs', 'Metal Chairs', 'Office Chairs', 'Gaming Chairs'],
    ['Coffee Tables', 'Office Tables', 'Coffee Table Sets', 'Nest Of Tables', 'Side & End Tables', 'Laptop Tables', 'Console Tables'],
  ]
 
  furnishings: any[] = [
    ['Furnishings', 'Bookshelves', 'Display Unite', 'Magazine Racks', 'Shoe Racks', 'Wall Shelves', 'Trunk & Blanketbox'],
    ['Fabric Sofas', 'Wooden Sofas', '3 Seater Sofas', '2 Seater Sofas', '1 Seater Sofas', 'L Shaped Sofas', 'Leather Sofa', 'Diwaans', 'Futons'],
    ['Wingback Chairs', 'Lounge Chairs', 'Loveseats', 'Ottomans', 'Armchairs', 'Metal Chairs', 'Office Chairs', 'Gaming Chairs'],
    ['Coffee Tables', 'Office Tables', 'Coffee Table Sets', 'Nest Of Tables', 'Side & End Tables', 'Laptop Tables', 'Console Tables'],
  ]
 
  outdoor: any[] = [
    ['Outdoor', 'Bookshelves', 'Display Unite', 'Magazine Racks', 'Shoe Racks', 'Wall Shelves', 'Trunk & Blanketbox'],
    ['Fabric Sofas', 'Wooden Sofas', '3 Seater Sofas', '2 Seater Sofas', '1 Seater Sofas', 'L Shaped Sofas', 'Leather Sofa', 'Diwaans', 'Futons'],
    ['Wingback Chairs', 'Lounge Chairs', 'Loveseats', 'Ottomans', 'Armchairs', 'Metal Chairs', 'Office Chairs', 'Gaming Chairs'],
    ['Coffee Tables', 'Office Tables', 'Coffee Table Sets', 'Nest Of Tables', 'Side & End Tables', 'Laptop Tables', 'Console Tables'],
  ]

  hoverSubject = new Subject<string>();
  hoverTimeout = 300;

  SofasHoverTimer: string = '';
  LivingHoverTimer: string = '';
  BedroomHoverTimer: string = '';
  DinningKitchenHoverTimer: string = '';
  StorageHoverTimer: string = '';
  StudyOfficeHoverTimer: string = '';
  LampsLightingsHoverTimer: string = '';
  FurnishingsHoverTimer: string = '';
  OutdoorHoverTimer: string = '';

  HoverShow: any = 'default';

  loginUser: any;

  @Input() wishlistArray: any[] = [];

  ngOnInit(): void {

    this.loginUser = (JSON.parse(localStorage.getItem("loginUser") || '{}')?.email || '').split('@')[0];

    this.hoverSubject
      .pipe(
        debounceTime(this.hoverTimeout),
        switchMap((category) => {
          this.SofasHoverTimer = category;
          this.LivingHoverTimer = category;
          this.BedroomHoverTimer = category;
          this.DinningKitchenHoverTimer = category;
          this.StorageHoverTimer = category;
          this.StudyOfficeHoverTimer = category;
          this.LampsLightingsHoverTimer = category;
          this.FurnishingsHoverTimer = category;
          this.OutdoorHoverTimer = category;
          return timer(0);
        })
      )
    .subscribe();
  }

  mouseLeave(){
    this.HoverShow = 'default';
    this.hoverSubject.next('');
  }
 
  changeHoverState(name: any){
    if (name == 'Sofas') {
      this.hoverSubject.next(name);
      this.HoverShow = 'HoverShow';
    } else if (name == 'Living') {
      this.hoverSubject.next(name);
      this.HoverShow = 'HoverShow';
    } else if (name == 'Bedroom') {
      this.hoverSubject.next(name);
      this.HoverShow = 'HoverShow';
    } else if (name == 'D&K') {
      this.hoverSubject.next(name);
      this.HoverShow = 'HoverShow';
    } else if (name == 'Storage') {
      this.hoverSubject.next(name);
      this.HoverShow = 'HoverShow';
    } else if (name == 'Study & Office') {
      this.hoverSubject.next(name);
      this.HoverShow = 'HoverShow';
    } else if (name == 'Lamps & Lightings') {
      this.hoverSubject.next(name);
      this.HoverShow = 'HoverShow';
    } else if (name == 'Furnishings') {
      this.hoverSubject.next(name);
      this.HoverShow = 'HoverShow';
    } else if (name == 'Outdoor') {
      this.hoverSubject.next(name);
      this.HoverShow = 'HoverShow';
    } else {
      alert(false);
    }
  }


}
