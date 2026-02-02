import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AdmissionsComponent } from './pages/admissions/admissions.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { adminGuard } from './guards/admin.guard';
import { EnquiriesComponent } from './admin/enquiries/enquiries.component';


export const routes: Routes = [
    {path:'',  component: HomeComponent },
    {path:'about', component:AboutComponent},
     {path:'admissions', component:AdmissionsComponent},
      {path:'contact', component:ContactComponent},
       {path:'gallery', component:GalleryComponent},
       {path:'admin/login', loadComponent: () => import('./admin/login/login.component').then(m => m.LoginComponent)},
       {path:'admin/enquiries', component:EnquiriesComponent, canActivate:[adminGuard]},

];
