import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  apiUrl='http://localhost:3000/api/enquiry'

  constructor(private http: HttpClient) { }

  saveEnquiry(data:any){
   return this.http.post(this.apiUrl, data);
  }
  getEnquiries(){
   return this.http.get<any[]>(this.apiUrl);
  }
}
