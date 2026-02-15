import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  apiUrl = 'https://school-web-backend-5yye.onrender.com/api/enquiry';

  // apiUrl='http://localhost:3000/api/enquiry'

  constructor(private http: HttpClient) { }

  saveEnquiry(data:any){
   return this.http.post(this.apiUrl, data);
  }
  getEnquiries(){
    const token=localStorage.getItem('adminToken') ;//JWT
    const headers=new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
  //  return this.http.get<any[]>(this.apiUrl);
  return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
