import { Component } from '@angular/core';
import { loginRegistrationModel } from '../../models/login-register-models/loginRegistrationModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../shared/components/services/validation-service/validation.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  loginRegistrationModel: loginRegistrationModel = new loginRegistrationModel();
  usersArrayList: any[] = [];
 
  showPassword: boolean = false;

  constructor(private validationService: ValidationService, private toaster: ToastrService, private router: Router){}

  ngOnInit(): void {
    const data = localStorage.getItem('SetRegisteredUserList');
    if(data){
      this.usersArrayList = JSON.parse(data)
    }
  }

  showPass() {
    this.showPassword = !this.showPassword;
  }

  registeration(){
    if(this.validationService.isEmptyNullUndefine(this.loginRegistrationModel.email)){
      this.toaster.error("Please enter email");
    }else if(!this.validationService.emailRegex2(this.loginRegistrationModel.email)){
      this.toaster.error("Please provide valid email");
    }else if(this.validationService.isEmptyNullUndefine(this.loginRegistrationModel.password)){
      this.toaster.error("Please enter password");
    }else if(!this.validationService.passwordRegex(this.loginRegistrationModel.password)){
      this.toaster.error("Please provide valid password");
    }else if(this.loginRegistrationModel.password !== this.loginRegistrationModel.confirmpassword){
      this.toaster.error("Password is not matching please try again");
    }
    else{
      const registeredUsers: loginRegistrationModel = {
        email: this.loginRegistrationModel.email,
        password: this.loginRegistrationModel.password,
        confirmpassword: this.loginRegistrationModel.confirmpassword,
      }
      this.usersArrayList.push(registeredUsers);
      localStorage.setItem("SetRegisteredUserList", JSON.stringify(this.usersArrayList));
      this.toaster.success("Welcome to login page");
      this.router.navigate(['/login']);
    }
  }


}
