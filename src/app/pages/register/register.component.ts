import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading = false;
  location: any = {};
  message = "";
  validateForm: FormGroup<{
    businessName: FormControl<string>;
    type: FormControl<string>;
    contactPersonName: FormControl<string>;
    phoneNumber: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    businessName: ['', [Validators.required]],
    type: ['', [Validators.required]],
    contactPersonName: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    remember: [true]
  });

  submitForm(): void {
    this.isLoading = true;
    if(this.message == "") {
      this.isLoading = false
      this.location = null;
      // todo display error message
      this.mes.create("error", `Please Provide your company location`);
      return;
    }


    if (this.validateForm.valid) {
      if(this.validateForm.value.password !== this.validateForm.value.confirmPassword) {
        this.mes.create("error", `Both provided passwords are not the same!`);
        this.isLoading = false;
        this.validateForm.patchValue({confirmPassword: ""});
        return;

      }

      const formData = this.validateForm.value;
      const newData = {
        businessName: formData.businessName,
        businessType: formData.type,
        contactPersonName: formData.contactPersonName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
        ...this.location
      }

      setTimeout(() => {
        this.apiService.registerBusiness(newData).subscribe(response => {

          console.log("API Response - ", response);
          this.validateForm.reset();
          this.mes.create("success", `your ${newData.type} has been registered successfully!`);

          this.routes.navigate(["/success-registration"]);
        }, error => { console.log("API Error - ", error); }, () => {
          this.isLoading = false
        })

      }, 2000)
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.isLoading = false
    }
  }

  redirect(): void {
    this.routes.navigate(["/login"]);
  }

  async asyncGenerateLocation() {
    this.isLoading = true;
    await setTimeout(() => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              let latitude = position.coords.latitude;
              let longitude = position.coords.longitude;

              this.location = {
                latitude,
                longitude,
              };
              this.message = `Longitude - ${longitude}, Latitude - ${latitude}. Location Information Tracked Successfully!`
              this.mes.create("success", `Location Tracked Successfully!`);
            }
            this.isLoading = false
          },
          (error) => {
            console.log(error);
            this.isLoading = false
          }
        );
      } else {
        this.isLoading = false
        this.message = 'Geolocation is not supported by this browser.';
        this.mes.create("error", `Geolocation is not supported by this browser.`);
      }
    }, 2000);
  }

  redirectToLanding(): void {
    this.routes.navigate(["/landing"]);
  }

  constructor(private fb: NonNullableFormBuilder, private routes: Router, private mes: NzMessageService, private apiService: ApiService) {}
}
