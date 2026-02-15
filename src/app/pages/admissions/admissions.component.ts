import { EnquiryService } from './../../services/enquiry.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-admissions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admissions.component.html',
  styleUrl: './admissions.component.css',
})
export class AdmissionsComponent {
  admissionForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private enquiryService: EnquiryService,
  ) {
    this.admissionForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      parentName: ['', [Validators.required, Validators.minLength(3)]],
      classApplied: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      email: ['', Validators.email],
      message: ['', Validators.required],
    });
  }

  // 👇 HTML ke liye shortcut
  getControl(name: string) {
    return this.admissionForm.get(name);
  }
  submitForm() {
    this.submitted = true;

    if (this.admissionForm.invalid) {
      this.admissionForm.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.admissionForm.value,
      phone: '+91' + this.admissionForm.value.phone,
    };

    this.enquiryService.saveEnquiry(payload).subscribe({
      next: () => {
        this.admissionForm.reset();
        this.submitted = false;
        // ✅ SweetAlert Success
        Swal.fire({
          icon: 'success',
          title: 'Thank You!',
          text: 'Enquiry submitted successfully',
          width: '360px', // desktop pe auto
          // mobile pe fit
          padding: '1.25rem',
          confirmButtonText: 'OK',
          confirmButtonColor: '#1e40af', // school theme blue
          customClass: {
            popup: 'swal-responsive',
          },
        });
      },
      error: (err) => {
        console.error(err);
        // ❌ SweetAlert Error
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Server error. Please try again later.',
          confirmButtonText: 'OK',
        });
      },
    });
  }
  // allow only numbers in phone input
  onlyNumber(event: KeyboardEvent) {
    const key = event.key;

    if (
      key === 'Backspace' ||
      key === 'Delete' ||
      key === 'ArrowLeft' ||
      key === 'ArrowRight'
    ) {
      return;
    }

    if (!/^[0-9]$/.test(key)) {
      event.preventDefault();
    }
  }

  // ensure max 10 digits & remove non-numbers
  onPhoneInput() {
    const control = this.admissionForm.get('phone');
    if (!control) return;

    let value = control.value || '';
    value = value.replace(/\D/g, '');

    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    control.setValue(value, { emitEvent: false });
  }
}
