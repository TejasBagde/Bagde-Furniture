import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { loginRegistrationModel } from '../../models/login-register-models/loginRegistrationModel';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../shared/components/services/validation-service/validation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  showPassword: boolean = false;

  constructor(private toasterService: ToastrService, private router: Router, private validationService: ValidationService){}

  loginRegistrationModel: loginRegistrationModel = new loginRegistrationModel();
  identifyUser: any[] = [];

  ngOnInit(): void {
    const usersList: any = localStorage.getItem("SetRegisteredUserList");
    this.identifyUser = JSON.parse(usersList);
    console.log("tejas", this.identifyUser);
  }
 
  login() {
    if (this.validationService.isEmptyNullUndefine(this.loginRegistrationModel.email)) {
      this.toasterService.error("Please enter email");
    } else if (!this.validationService.emailRegex2(this.loginRegistrationModel.email)) {
      this.toasterService.error("Please enter valid email");
    } else if (this.validationService.isEmptyNullUndefine(this.loginRegistrationModel.password)) {
      this.toasterService.error("Please enter password");
    } else if (!this.validationService.passwordRegex(this.loginRegistrationModel.password)) {
      this.toasterService.error("Please enter valid password");
    } else {
      if (this.identifyUser) {
        const user = this.identifyUser.find((x: any) => 
          x.email === this.loginRegistrationModel.email && x.password === this.loginRegistrationModel.password
        );
        if (user) {
          this.toasterService.success('Welcome Home');
          this.router.navigate(['/home']);
        } else {
          this.toasterService.error('Invalid Credentials');
        }
      } else {
        this.toasterService.info("User is not registered");
      }
    }
  }
  

  showPass() {
    this.showPassword = !this.showPassword;
  }

}
