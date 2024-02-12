import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://zenonymous002.pythonanywhere.com';
  private mainUrl = 'api/v1/feedme';
  private authUrl = 'auth/users';

  private token = () => {
    const jsonData = localStorage.getItem('token');
    const object = JSON.parse(jsonData!);
    return object?.access;
  };

  public registerBusiness = (body: any) => {
    return this.http.post(`${this.baseUrl}/${this.mainUrl}/users/`, body);
  };

  getBusiness = () => {
    return this.http.get(`${this.baseUrl}/${this.mainUrl}/users/`, {
      headers: {
        Authorization: 'Bearer ' + this.token(),
        'Content-Type': 'application/json',
      },
    });
  };

  updateBusinessInfo = (userId: string, body: any) => {
    return this.http.patch(
      `${this.baseUrl}/${this.mainUrl}/users/${userId}/`,
      body,
      {
        headers: {
          Authorization: 'Bearer ' + this.token(),
          'Content-Type': 'application/json',
        },
      }
    );
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

  constructor(private http: HttpClient) {}
}
