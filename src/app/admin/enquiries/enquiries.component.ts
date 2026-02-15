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
  showLogoutModal = false;
  isDarkMode = false;
  constructor(
    private enquiryService: EnquiryService,
    private router: Router,
  ) {
    this.loadEnquiries();
  }

  ngOnInit() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    this.enableDarkMode();
  }
}

toggleDarkMode() {
  this.isDarkMode ? this.disableDarkMode() : this.enableDarkMode();
}

enableDarkMode() {
  document.body.classList.add('dark-mode');
  this.isDarkMode = true;
  localStorage.setItem('theme', 'dark');
}

disableDarkMode() {
  document.body.classList.remove('dark-mode');
  this.isDarkMode = false;
  localStorage.setItem('theme', 'light');
}

  loadEnquiries() {
    this.enquiryService.getEnquiries().subscribe((data) => {
      this.enquiries = data;
    });
  }
  confirmLogout() {
    localStorage.removeItem('adminToken'); // ya token
     localStorage.removeItem('adminLoggedIn');
     localStorage.clear();
    this.showLogoutModal = false;
    this.router.navigate(['/admin/login'], { replaceUrl: true });
  }
  openLogoutModal() {
    this.showLogoutModal = true;
  }

  closeLogoutModal() {
    this.showLogoutModal = false;
  }

  logout() {
     localStorage.removeItem('adminToken');
  localStorage.removeItem('adminLoggedIn');
    this.router.navigate(['/admin/login'], { replaceUrl: true });
  }

  exportCSV() {
    if (!this.enquiries || this.enquiries.length === 0) {
      alert('No enquiries to export');
      return;
    }

    const headers = [
      'Student Name',
      'Parent Name',
      'Class',
      'Phone',
      'Email',
      'Message',
    ];

    const rows = this.enquiries.map((e) => [
      e.student_name,
      e.parent_name,
      e.class_applied,
      e.phone,
      e.email || '',
      e.message || '',
    ]);

    let csvContent =
      headers.join(',') +
      '\n' +
      rows.map((r) => r.map((v) => `"${v}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'admission_enquiries.csv';
    link.click();

    URL.revokeObjectURL(url);
  }
}
