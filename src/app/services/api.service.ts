import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = "http://zenonymous002.pythonanywhere.com";
  private mainUrl = "api/v1/feedme";
  private authUrl = "auth/users";

  private token = () => {
    const jsonData = localStorage.getItem("token");
    const object = JSON.parse(jsonData!);
    return object?.access;
  }

  public registerBusiness = (param: any) => {
    return this.http.post(`${this.baseUrl}/${this.mainUrl}/users/`, param);
  };

  getBusiness = () => {
    return this.http.post(`${this.baseUrl}/${this.mainUrl}/users/`, {
      Headers: {
        Autorization: this.token()
      }
    });
  };

  login = (param: any) => {
    return this.http.post(`${this.baseUrl}/auth/jwt/create/`, param);
  };

  addDateRange = (param: any) => {
    return this.http.post(`${this.baseUrl}/${this.mainUrl}/users/`, param);
  };

  updateDateRange = (param: any) => {
    return this.http.post(`${this.baseUrl}/${this.mainUrl}/users/`, param);
  };

  constructor(private http: HttpClient) { }
}
