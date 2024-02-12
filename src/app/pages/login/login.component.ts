import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    email: ['john@gmail.com', [Validators.required, Validators.email]],
    password: ['ILoveDjango', [Validators.required]],
    remember: [true]
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isLoading = true;
      const formData = this.validateForm.value;
      this.apiService.login({email: formData.email, password: formData.password}).subscribe(response => {
        console.log("response - ", response);
        localStorage.setItem("token", JSON.stringify(response));
        this.validateForm.reset();
            this.mes.create("success", `Successfully Authenticated.`);
            if(formData.email?.includes("john")) {
              this.routes.navigate(['/welcome/business-list']);
            } else {
              this.routes.navigate(['/welcome/user-detail']);
            }
      }, error => { console.log("error - ", error);
      this.mes.create("error", `Wrong email/password, Try again!.`);
      this.validateForm.patchValue({password: ""}); }, () => {

        this.isLoading = false;
      });
      setTimeout(() => {
        // const formData = this.validateForm.value;
        // const jsonData = localStorage.getItem("data");
        //   const data: any[] = jsonData ?  JSON.parse(jsonData!) : [];
        //   const account = data.filter(item => formData.email == item.email && formData.password == item.password);

          // if (account.length) {
          //   this.validateForm.reset();
          //   this.mes.create("success", `Successfully Authenticated.`);
          //   this.routes.navigate(['/welcome']);
          // } else {
          //   this.mes.create("error", `Wrong email/password, Try again!.`);
          //   this.validateForm.patchValue({password: ""});
          // }
          // this.isLoading = false;
      }, 2000)
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  redirect(): void {
    this.routes.navigate(["/register"]);
  }

  redirectToLanding(): void {
    this.routes.navigate(["/landing"]);
  }

  constructor(private fb: NonNullableFormBuilder, private routes: Router, private mes: NzMessageService, private apiService: ApiService) {}
}
