import { EnquiryService } from './../../services/enquiry.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admissions',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admissions.component.html',
  styleUrl: './admissions.component.css'
})
export class AdmissionsComponent {
  admissionForm:FormGroup

  constructor(private fb:FormBuilder,private enquiryService:EnquiryService){
this.admissionForm=this.fb.group({
 studentName: ['', Validators.required],
      parentName: ['', Validators.required],
      classApplied: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', Validators.email],
      message: ['']
});
  }

 submitForm() {

  if (this.admissionForm.invalid) {
    alert('Please fill all required fields correctly');
    return;
  }

  this.enquiryService
    .saveEnquiry(this.admissionForm.value)
    .subscribe({
      next: () => {
        alert('Enquiry submitted successfully');
        this.admissionForm.reset();
      },
      error: (err) => {
        console.error(err);
        alert('Server error. Please try again.');
      }
    });
}

}
