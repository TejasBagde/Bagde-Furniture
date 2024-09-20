import { Component } from '@angular/core';
import { DeliveryFormResponse, postofficeResponse } from '../../models/order-classes/order-class';
import { GenericResponse, PincodeResponse } from '../../models/order-interface/interface';
import { ApiService } from '../../../shared/components/services/api-service/api.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  getCountryList: any[] = [];
  DeliveryFormResponse: DeliveryFormResponse = new DeliveryFormResponse();
  postofficeResponse: postofficeResponse = new postofficeResponse();
  showPin: any;
  addressList: any[] =[];

  constructor(private apiService: ApiService, private toster: ToastrService, private router: Router){}

  ngOnInit(): void {
    this.getCountry();
  }

  getCountry(){
    this.apiService.getCountry().subscribe({
      next: (res: GenericResponse)=>{
        if(res.error == false){
          this.getCountryList = res.data;
        }else{
          this.toster.error(res.msg)
        }
      }, error: (erro) =>{
        this.toster.error("An unexpected error has occurred, contact with administrator");
        this.router.navigate(['/not-found']);
      }
    })
  }

  pincodeForm(pin: postofficeResponse["Pincode"]){
    this.apiService.pincodeForm(pin).subscribe({
      next: (res: any)=>{
        if(res[0].Status == 'Success'){
          this.toster.success(res[0].Status);
          const postList:any = res;
          for(let item of postList){
            this.addressList = item.PostOffice;
            this.postofficeResponse = item.PostOffice[0];
          }
        }else{
          this.toster.error(res[0].Message);
        }
      }, error: (err)=> {
        this.toster.error("An unexpected error has occurred, contact with administrator");
        this.router.navigate(['/not-found']);
      },
    })
  }


}
