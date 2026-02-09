import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notice-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notice-bar.component.html',
  styleUrl: './notice-bar.component.css'
})
export class NoticeBarComponent implements OnInit {
showNotice= true;

 ngOnInit() {
    const closed = localStorage.getItem('noticeClosed');
    if (closed === 'true') {
      this.showNotice = false;
    }
  }
closeNotice() {
  this.showNotice = false;
  localStorage.setItem('noticeClosed', 'true');
}
}
