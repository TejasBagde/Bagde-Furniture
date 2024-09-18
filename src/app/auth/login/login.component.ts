import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { loginRegistrationModel } from '../../models/login-register-models/loginRegistrationModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  showPassword: boolean = false;

  constructor(private toasterService: ToastrService, private router: Router){}

  loginRegistrationModel: loginRegistrationModel = new loginRegistrationModel();
  identifyUser: any[] = [];

  ngOnInit(): void {
    const usersList: any = localStorage.getItem("SetRegisteredUserList");
    this.identifyUser = JSON.parse(usersList)
  }
 
  login(){
    this.identifyUser.forEach((x: any) => {
      if ((x.email === this.loginRegistrationModel.email) && (x.password === this.loginRegistrationModel.password)) {
        this.toasterService.success('Welcome Home');
        this.router.navigate(['/home']);
      }else {
        this.toasterService.error('Invalid Credentials');
      }
    });
  }

  showPass() {
    this.showPassword = !this.showPassword;
  }

}
