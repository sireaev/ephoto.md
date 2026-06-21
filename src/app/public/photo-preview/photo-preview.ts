import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions, CarouselModule, SlidesOutputData } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-photo-preview',
  imports: [CarouselModule, CommonModule],
  templateUrl: './photo-preview.html',
  styleUrl: './photo-preview.scss',
})
export class PhotoPreview implements OnInit {
  private activeModal = inject(NgbActiveModal);
  @Input({ required: true }) images: string[] = [];
  @Input() startIndex = 0;
  currentIndex = 0;
  carouselOptions: OwlOptions = {
    startPosition: this.startIndex,

    items: 1,
    loop: false,
    nav: true,
    dots: false,
    autoHeight: false,
    center: true,
    navText: [
      '<span class="nav-btn">‹</span>',
      '<span class="nav-btn">›</span>',
    ],
  };

  ngOnInit(): void {
    this.currentIndex = this.startIndex;
    const isMobile = window.innerWidth <= 768;

    // Assign a new object so owl-carousel-o detects the change (it compares
    // options by reference, not deeply).
    this.carouselOptions = {
      ...this.carouselOptions,
      startPosition: this.startIndex,
      // Infinite loop clones every slide; on mobile that doubles the number of
      // full-res images Safari has to decode and is what triggers the crash.
      loop: !isMobile,
    };
  }

  // `translated` fires once the carousel has finished moving and the new data
  // is populated. The active slide's `id` equals the original array index
  // (set via [id]="i.toString()"), so it stays correct even when loop mode
  // clones slides — unlike `startPosition`, which is owl's internal position.
  onTranslated(event: SlidesOutputData): void {
    const id = event.slides?.[0]?.id;
    if (id != null) {
      this.currentIndex = Number(id);
    }
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
