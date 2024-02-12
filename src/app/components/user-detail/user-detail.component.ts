import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  data: any = null!;
  isLoading = false;
  userId = '';
  location: any = {};
  message = '';
  validateForm: FormGroup<{
    businessName: FormControl<string>;
    businessType: FormControl<string>;
    contactPersonName: FormControl<string>;
    phoneNumber: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }> = this.fb.group({
    businessName: ['', [Validators.required]],
    businessType: ['', [Validators.required]],
    contactPersonName: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', []],
    confirmPassword: ['', []],
  });

  submitForm(): void {
    this.isLoading = true;

    if (this.validateForm.valid) {
      if (
        this.validateForm.value.password !==
        this.validateForm.value.confirmPassword
      ) {
        this.mes.create('error', `Both provided passwords are not the same!`);
        this.isLoading = false;
        this.validateForm.patchValue({ confirmPassword: '' });
        return;
      }
      console.log("FORM - ", this.validateForm);
      const formData = this.validateForm.value;
      let newData = {
        businessName: formData.businessName,
        businessType: formData.businessType,
        contactPersonName: formData.contactPersonName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        ...this.location,
      };

      if(!!formData.password) {
        newData = {...newData, password: formData.password}
      }

        this.apiService.updateBusinessInfo(this.userId, newData).subscribe(
          (response) => {
            console.log('API Response - ', response);
            this.mes.create(
              'success',
              `your Information has been updated successfully!`
            );
          },
          (error) => {
            console.log('API Error - ', error);
          },
          () => {
            this.isLoading = false;
          }
        );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.isLoading = false;
    }
  }

  redirect(): void {
    this.routes.navigate(['/login']);
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
              this.message = `Longitude - ${longitude}, Latitude - ${latitude}. Location Information Tracked Successfully!`;
              this.mes.create('success', `Location Tracked Successfully!`);
            }
            this.isLoading = false;
          },
          (error) => {
            console.log(error);
            this.isLoading = false;
          }
        );
      } else {
        this.isLoading = false;
        this.message = 'Geolocation is not supported by this browser.';
        this.mes.create(
          'error',
          `Geolocation is not supported by this browser.`
        );
      }
    }, 2000);
  }

  redirectToLanding(): void {
    this.routes.navigate(['/landing']);
  }

  ngOnInit(): void {
    this.apiService.getBusiness().subscribe(
      (response: any) => {
        console.log(response);
        this.data = response;
        this.userId = response.id;
        this.location = {
          latitude: response.latitude,
          longitude: response.longitude,
        };
        this.message = `Longitude - ${response.longitude}, Latitude - ${response.latitude}.`;
        this.validateForm.patchValue({
          businessName: response.businessName,
          businessType: response.businessType,
          contactPersonName: response.contactPersonName,
          phoneNumber: response.phoneNumber,
          email: response.email,
        });
      },
      (error) => console.log(error),
      () => (this.isLoading = false)
    );
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private routes: Router,
    private mes: NzMessageService,
    private apiService: ApiService
  ) {}
}
