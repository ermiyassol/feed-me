import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isCollapsed = false;

  onLogout = () => {
    localStorage.removeItem("token");
    this.routes.navigate(["../"], {relativeTo: this.route});
  }

  constructor(private routes: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
