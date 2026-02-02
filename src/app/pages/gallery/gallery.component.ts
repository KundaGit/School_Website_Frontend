import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  selectedImage: any = null;
 images = [
    {
      src: 'https://picsum.photos/id/1011/600/400',
      title: 'School Building'
    },
    {
      src: 'https://picsum.photos/id/1015/600/400',
      title: 'Classroom'
    },
    {
      src: 'https://picsum.photos/id/1025/600/400',
      title: 'Annual Function'
    },
    {
      src: 'https://picsum.photos/id/1035/600/400',
      title: 'Sports Day'
    },
    {
      src: 'https://picsum.photos/id/1040/600/400',
      title: 'Activities'
    },
    {
      src: 'https://picsum.photos/id/1062/600/400',
      title: 'Teachers'
    }
  ];

  openImage(img: any): void {
    this.selectedImage = img;
  }
   closeImage() {
    this.selectedImage = null;
  }
}
