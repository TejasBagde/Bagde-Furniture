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
  shippingListData: any[] = [];

  constructor(private apiService: ApiService, private toster: ToastrService, private router: Router){}

  ngOnInit(): void {
    this.getCountry();
  }

  clearAllData(){
    this.DeliveryFormResponse.name = '';
    this.postofficeResponse.Name = '';
    this.DeliveryFormResponse.firstname = '';
    this.DeliveryFormResponse.lastname = '';
    this.postofficeResponse.Pincode = '';
    this.postofficeResponse.State = '';
    this.postofficeResponse.District = '';
    this.DeliveryFormResponse.Phone = '';
    this.DeliveryFormResponse.Address = '';
    this.DeliveryFormResponse.email = '';
    this.DeliveryFormResponse.date = '';
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

  submit(){
    const shippingModel: DeliveryFormResponse | postofficeResponse = {
      name: this.DeliveryFormResponse.name,
      Name: this.postofficeResponse.Name,
      firstname: this.DeliveryFormResponse.firstname,
      lastname: this.DeliveryFormResponse.lastname,
      Pincode: this.postofficeResponse.Pincode,
      State: this.postofficeResponse.State,
      District: this.postofficeResponse.District,
      Phone: this.DeliveryFormResponse.Phone,
      Address: this.DeliveryFormResponse.Address,
      email: this.DeliveryFormResponse.email,
      date: this.DeliveryFormResponse.date,
    }
    this.shippingListData.push(shippingModel);
    console.log("shippingList", this.shippingListData);

    this.clearAllData();
  }


}
