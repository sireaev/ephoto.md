import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-photo-preview',
  imports: [CarouselModule, CommonModule],
  templateUrl: './photo-preview.html',
  styleUrl: './photo-preview.scss',
})
export class PhotoPreview implements OnInit {
  @Input({ required: true }) images: string[] = [];
  @Input() startIndex = 0;
  carouselOptions: OwlOptions = {
    startPosition: this.startIndex,

    items: 1,
    loop: true,
    nav: true,
    dots: true,
    autoWidth: true,
    autoHeight: false,
    center: true,
    navText: [
      '<span class="nav-btn">‹</span>',
      '<span class="nav-btn">›</span>',
    ],
  };

  ngOnInit(): void {
    this.carouselOptions.startPosition = this.startIndex;
  }
}
