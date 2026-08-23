import { AfterViewInit, Component, computed, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, OnDestroy, signal, ViewChild } from '@angular/core';
import { Header } from '../shared/header/header';
import { Footer } from '../shared/footer/footer';
import { NgClass } from '@angular/common';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScreenSizeService } from '../shared/screen-size.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { PublicService } from './services/public.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPublicReviewModal } from './add-public-review-modal/add-public-review-modal';
import { IReview } from '../dashboard/interfaces/review.interface';
import { ToastService } from '../dashboard/services/toast.service';
import { tap } from 'rxjs';
import { RouterLink } from '@angular/router';

type IHover = {
  [key: string]: boolean
}

@Component({
  selector: 'app-public',
  imports: [RouterLink, Header, Footer, NgClass, CarouselModule],
  templateUrl: './public.html',
  styleUrl: './public.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Public implements AfterViewInit, OnDestroy {
  private modalService = inject(NgbModal);
  toast = inject(ToastService);
  publicService = inject(PublicService);
  isHovered: IHover = {};
  reviews = toSignal(
    this.publicService.reviewList(),
    { initialValue: { data: [], pagination: {}, success: true } }
  );
  prices = toSignal(
    this.publicService.pricesList(),
    { initialValue: { data: [], pagination: {}, success: true } }
    );
  categories = toSignal(
    this.publicService.categoryList(),
    { initialValue: { data: [], pagination: {}, success: true } }
  );
  homepage = signal<any>(null);
  galleryPage = signal<any>(null);
  retouchPage = signal<any>(null);
  servicesPage = signal<any>(null);
  testimonialPage = signal<any>(null);
  aboutPage = signal<any>(null);
  contactPage = signal<any>(null);
  beforeAfterRow1 = signal<any[]>([]);
  beforeAfterRow2 = signal<any[]>([]);
  beforeAfterRow3 = signal<any[]>([]);
  pages = toSignal(
    this.publicService.pages().pipe(
      tap((response) => {
        const homePage = response.data.find((page) => page.type === 'homepage');
        if (homePage) {
          this.homepage.set(homePage);
        }
        const galleryPage = response.data.find((page) => page.type === 'gallery');
        if (galleryPage) {
          this.galleryPage.set(galleryPage);
        }
        const retouchPage = response.data.find((page) => page.type === 'retouch');
        if (retouchPage) {
          this.retouchPage.set(retouchPage);
        }
        const servicesPage = response.data.find((page) => page.type === 'services');
        if (servicesPage) {
          this.servicesPage.set(servicesPage);
        }
        const testimonialPage = response.data.find((page) => page.type === 'testimonial');
        if (testimonialPage) {
          this.testimonialPage.set(testimonialPage);
        }
        const aboutPage = response.data.find((page) => page.type === 'about');
        if (aboutPage) {
          this.aboutPage.set(aboutPage);
        }
        const contactPage = response.data.find((page) => page.type === 'contact');
        if (contactPage) {
          this.contactPage.set(contactPage);
        }

      })
    ),
    { initialValue: { data: [], pagination: {}, success: true } }
  );

  beforeAfterList = toSignal(
    this.publicService.beforeAfterList().pipe(
      tap((response) => {
        const row1 = response.data.filter((item) => item.row === 1);
        const row2 = response.data.filter((item) => item.row === 2);
        const row3 = response.data.filter((item) => item.row === 3);
        this.beforeAfterRow1.set(row1);
        this.beforeAfterRow2.set(row2);
        this.beforeAfterRow3.set(row3);
      })
    )
    ,
    { initialValue: {
      data: [],
      pagination: {}, success: true } }
  );
  currentReview = signal({[this.reviews().data.length > 1 ? 'slide2' : 'slide1']: true});

  pricingCarousel = computed<OwlOptions>(() => {
    const count = this.prices()?.data?.length ?? 0;
    const desktop = Math.min(3, Math.max(1, count));
    return {
      loop: false,
      margin: 20,
      autoplay: false,
      smartSpeed: 800,
      nav: count > desktop,
      items: desktop,
      navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
      dots: false,
      responsive: {
        0: { items: 1 },
        480: { items: 1 },
        768: { items: desktop },
        992: { items: desktop },
      }
    };
  });

  testimonialCarousel = computed<OwlOptions>(() => {
    const count = this.reviews()?.data?.length ?? 0;
    const desktop = Math.min(3, Math.max(1, count));
    return {
      loop: count > desktop,
      margin: 0,
      autoplay: false,
      nav: false,
      items: desktop,
      navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
      dots: false,
      responsive: {
        0: { items: 1 },
        480: { items: 1 },
        768: { items: desktop },
        992: { items: desktop },
      }
    };
  });
  isMobile;

  readonly phoneNumber = '+373 68 035 084';
  readonly phoneSegments = this.phoneNumber.split('').map((char, index) => ({
    char,
    index,
    type: /\d/.test(char) ? 'digit' as const : char === ' ' ? 'space' as const : 'symbol' as const
  }));
  phoneDisplayValues = signal<string[]>(
    this.phoneNumber.split('').map(c => (/\d/.test(c) ? '0' : c))
  );

  @ViewChild('phoneDisplay') private phoneDisplayEl!: ElementRef;
  private phoneObserver?: IntersectionObserver;
  private phoneAnimated = false;

  constructor(private screenSizeService: ScreenSizeService) {
    this.isMobile = toSignal(this.screenSizeService.isMobile$, { initialValue: false });
    this.currentReview.update(() => ({[this.isMobile() ? 'slide1' : 'slide2']: true  } as any));
  }

  ngAfterViewInit(): void {
    this.phoneObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.phoneAnimated) {
          this.phoneAnimated = true;
          this.animatePhoneCountUp();
        }
      },
      { threshold: 0.3 }
    );
    this.phoneObserver.observe(this.phoneDisplayEl.nativeElement);
  }

  ngOnDestroy(): void {
    this.phoneObserver?.disconnect();
  }

  private animatePhoneCountUp(): void {
    const chars = this.phoneNumber.split('');
    const digitJobs = chars
      .map((c, i) => ({ char: c, index: i, target: parseInt(c, 10) }))
      .filter(({ char }) => /\d/.test(char));

    digitJobs.forEach(({ index, target }, di) => {
      const staggerDelay = di * 60;
      let current = 0;

      setTimeout(() => {
        if (target === 0) {
          const vals = [...this.phoneDisplayValues()];
          vals[index] = '0';
          this.phoneDisplayValues.set(vals);
          return;
        }
        const stepMs = 80;
        const timer = setInterval(() => {
          current++;
          const vals = [...this.phoneDisplayValues()];
          vals[index] = String(current);
          this.phoneDisplayValues.set(vals);
          if (current >= target) clearInterval(timer);
        }, stepMs);
      }, staggerDelay);
    });
  }

  addOverlay(element: any): void {
    this.isHovered[element] = true;
  }

  removeOverlay(element: any): void {
    this.isHovered[element] = false;
  }

  onTranslated(data: SlidesOutputData) {
    if (this.isMobile()) {
      this.currentReview.update((x: any) => ({[data.slides![0].id]: true  } as any));
    } else if (data.slides![1]) {
      this.currentReview.update((x: any) => ({[data.slides![1].id]: true  } as any));
    } else {
      this.currentReview.update((x: any) => ({[data.slides![0].id]: true  } as any));
    }
  }

  openAddPublicReviewModal(): void {
    const modalRef = this.modalService.open(AddPublicReviewModal);
    modalRef.componentInstance.categories = [...this.categories()!.data];
    modalRef.closed.subscribe((response) => {
      this.createReview(response);
    });
  }

  createReview(review: IReview): void {
    this.publicService.createReview({...review, rating: +review.rating!}).subscribe({
      next: () => {
        this.toast.success('Success', 'Recenzia a fost trimisă cu success!');
      }
    })
  }
}
