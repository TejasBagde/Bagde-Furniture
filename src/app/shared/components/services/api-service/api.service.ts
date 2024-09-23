import { Injectable } from '@angular/core';
import { SingleProduct } from '../../../../models/sofa-list-interface/sofaListInterface';
import { HttpClient } from '@angular/common/http';
import { GenericResponse, PincodeResponse } from '../../../../order/models/order-interface/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  homeBoxImages: SingleProduct[] = [
    {id: 1, name: 'Henry 3 Seater Sofa', description: 'this is test for json1', image: 'assets/sofas/1.webp', showHeartIcon: false, price: 200, material: 'leather', discount: 30},
    {id: 2, name: 'Sofa2', description: 'this is test for json2', image: 'assets/sofas/2.jpg', showHeartIcon: false, price: 100, material: 'leather', discount: 30},
    {id: 3, name: 'Sofa3', description: 'this is test for json3', image: 'assets/sofas/3.jpg', showHeartIcon: false, price: 450, material: 'leather', discount: 30},
    {id: 4, name: 'Sofa4', description: 'this is test for json4', image: 'assets/sofas/4.jpg', showHeartIcon: false, price: 200, material: 'leather', discount: 30},
    {id: 5, name: 'Sofa5', description: 'this is test for json5', image: 'assets/sofas/5.webp', showHeartIcon: false, price: 150, material: 'leather', discount: 30},
    {id: 6, name: 'Sofa6', description: 'this is test for json6', image: 'assets/sofas/6.webp', showHeartIcon: false, price: 750, material: 'leather', discount: 30},
  ];

  constructor(private http: HttpClient) { }

  fetchHomeItemsData(){
    let promise = new Promise((res: any, rej: any)=>{
      setTimeout(() => {
        res(this.homeBoxImages);
      }, 500);
    });
    return promise
  }

  getCountry(){
    return this.http.get<GenericResponse>('https://countriesnow.space/api/v0.1/countries/capital');
  }

  pincodeForm(pin: string){
    return this.http.get<PincodeResponse>(`https://api.postalpincode.in/pincode/${pin}`);
  }
}
