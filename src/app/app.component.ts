import { routes } from './app.routes';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/navbar/navbar.component";
import { FooterComponent } from './core/footer/footer.component';
import { NoticeBarComponent } from './shared/notice-bar/notice-bar.component';
import { AdmissionsComponent } from "./pages/admissions/admissions.component";
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NoticeBarComponent, AdmissionsComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'school-website';
  constructor(public router:Router){}
}
