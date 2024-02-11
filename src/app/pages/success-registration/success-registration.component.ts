import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-registration',
  templateUrl: './success-registration.component.html',
  styleUrls: ['./success-registration.component.css']
})
export class SuccessRegistrationComponent {

  redirect() {
    this.routes.navigate(["/landing"]);
  }
  constructor(private routes: Router) {}
}
