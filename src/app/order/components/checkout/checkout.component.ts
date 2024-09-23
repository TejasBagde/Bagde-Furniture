import { Component } from '@angular/core';
import { DeliveryFormResponse, postofficeResponse } from '../../models/order-classes/order-class';
import { GenericResponse } from '../../models/order-interface/interface';
import { ApiService } from '../../../shared/components/services/api-service/api.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ValidationService } from '../../../shared/components/services/validation-service/validation.service';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

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

  searchSubject = new Subject<string>();

  constructor(private apiService: ApiService, private toster: ToastrService, private router: Router, public validationService: ValidationService){}

  ngOnInit(): void {
    this.getCountry();
    this.searchPincode();
  }

  pincodeForm(pin: postofficeResponse["Pincode"]){
    this.searchSubject.next(pin);
  }

  searchPincode(){
    this.searchSubject.pipe(debounceTime(0),
    distinctUntilChanged(),
    switchMap((pincode)=> this.apiService.pincodeForm(pincode))).subscribe({
      next: (res: any)=>{
        if (res[0].Status == 'Success') {
          this.toster.success(res[0].Status);
          const postList: any = res;
          for (let item of postList) {
            this.addressList = item.PostOffice;
            this.postofficeResponse = item.PostOffice[0];
          }
        } else {
          this.toster.error(res[0].Message);
        }
      }, error: (err)=> {
        this.toster.error("An unexpected error has occurred, contact with administrator");
        this.router.navigate(['/not-found']);
      },
    })
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

  
  // pincodeForm(pin: postofficeResponse["Pincode"]){
  //   this.apiService.pincodeForm(pin).subscribe({
  //     next: (res: any)=>{
  //       if(res[0].Status == 'Success'){
  //         this.toster.success(res[0].Status);
  //         const postList:any = res;
  //         for(let item of postList){
  //           this.addressList = item.PostOffice;
  //           this.postofficeResponse = item.PostOffice[0];
  //         }
  //       }else{
  //         this.toster.error(res[0].Message);
  //       }
  //     }, error: (err)=> {
  //       this.toster.error("An unexpected error has occurred, contact with administrator");
  //       this.router.navigate(['/not-found']);
  //     },
  //   })
  // }


  submit(){
    if(this.validationService.isEmptyNullUndefine(this.DeliveryFormResponse.name)){
      this.toster.error("Please select country");
    }else if(this.validationService.isEmptyNullUndefine(this.DeliveryFormResponse.firstname)){
      this.toster.error("Name filled should not be empty");
    }else if(this.validationService.isEmptyNullUndefine(this.DeliveryFormResponse.lastname)){
      this.toster.error("Lastname filled should not be empty");
    }else if(!this.validationService.emailRegex2(this.DeliveryFormResponse.email)){
      this.toster.error("Please enter correct email");
    }else if(this.validationService.isEmptyNullUndefine(this.DeliveryFormResponse.date)){
      this.toster.error("Date filled should not be empty");
    }else if(this.validationService.isEmptyNullUndefine(this.postofficeResponse.Pincode)){
      this.toster.error("Pincode filled should not be empty");
    }else if(this.validationService.isEmptyNullUndefine(this.postofficeResponse.State)){
      this.toster.error("State filled should not be empty");
    }else if(this.validationService.isEmptyNullUndefine(this.postofficeResponse.District)){
      this.toster.error("City filled should not be empty");
    }else if(this.validationService.isEmptyNullUndefine(this.postofficeResponse.Name)){
      this.toster.error("Post Address filled should not be empty");
    }else if(!this.validationService.mobileNumberRegex(this.DeliveryFormResponse.Phone)){
      this.toster.error("Entred number is not valid");
    }else if(this.validationService.isEmptyNullUndefine(this.DeliveryFormResponse.Address)){
      this.toster.error("Delivery Address filled should not be empty");
    }
    else {
      const shippingModel: DeliveryFormResponse | postofficeResponse = {
        firstname: this.DeliveryFormResponse.firstname,
        lastname: this.DeliveryFormResponse.lastname,
        Pincode: this.postofficeResponse.Pincode,
        State: this.postofficeResponse.State,
        District: this.postofficeResponse.District,
        Phone: this.DeliveryFormResponse.Phone,
        Address: this.DeliveryFormResponse.Address,
        email: this.DeliveryFormResponse.email,
        date: this.DeliveryFormResponse.date,
        name: this.DeliveryFormResponse.name,
        Name: this.postofficeResponse.Name,
      }
      this.toster.success("Form filled Successfully");
      this.shippingListData.push(shippingModel);
      this.clearAllData();
    }
  }


}
