import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EnquiryService } from '../../services/enquiry.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enquiries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enquiries.component.html',
  styleUrl: './enquiries.component.css',
})
export class EnquiriesComponent {
  enquiries: any[] = [];
  constructor(
    private enquiryService: EnquiryService,
    private router: Router,
  ) {
    this.loadEnquiries();
  }

  loadEnquiries() {
    this.enquiryService.getEnquiries().subscribe((data) => {
      this.enquiries = data;
    });
  }
  logout() {
    localStorage.removeItem('adminLoggedIn');
    this.router.navigate(['/admin/login']);
  }
}
