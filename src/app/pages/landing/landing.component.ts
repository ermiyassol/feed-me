import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  redirect(route: string) {
    this.routes.navigate([`/${route}`]);
  }

  constructor(private routes: Router) {}
}
