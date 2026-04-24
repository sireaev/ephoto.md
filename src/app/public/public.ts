import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { Header } from '../shared/header/header';
import { Footer } from '../shared/footer/footer';
import { NgClass } from '@angular/common'; 
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScreenSizeService } from '../shared/screen-size.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { PublicService } from './services/public.service';
import { NgbInputDatepicker, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPublicReviewModal } from './add-public-review-modal/add-public-review-modal';
import { IReview } from '../dashboard/interfaces/review.interface';
import { ToastService } from '../dashboard/services/toast.service';
import { AltchaComponent } from '../shared/altcha/altcha';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { fromNgbDate } from '../shared/date.util';
import { IMail } from '../dashboard/interfaces/mail.interface';
import { tap } from 'rxjs';

type IHover = {
  [key: string]: boolean
}

@Component({
  selector: 'app-public',
  imports: [Header, NgbInputDatepicker, Footer, NgClass, CarouselModule, ReactiveFormsModule, AltchaComponent],
  templateUrl: './public.html',
  styleUrl: './public.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Public {
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
  currentReview = signal({[this.reviews().data.length > 1 ? 'slide2' : 'slide1']: true});
  
  pricingCarousel: OwlOptions = {
    loop: false,
    margin: 20,
    autoplay: true,
    smartSpeed: 800,
    nav: true,
    items: 3,
    navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
    dots: false,
    responsive : {
        0 : {
            items: 1
        },
        480 : {
            items: 1,
        },
        768 : {
            items: 3,
        },
        992 : {
            items: 3,
        }
    }
  }

  testimonialCarousel: OwlOptions = {
    loop: true,
    margin: 0,
    autoplay: false,
    // smartSpeed: 800,
    nav: false,
    items: 3 ,
    navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
    dots: false,
    responsive : {
        0 : {
            items: 1
        },
        480 : {
            items: 1,
        },
        768 : {
            items: 3,
        },
        992 : {
            items: 3,
        }
    }
  }
  isMobile;
  private fb = inject(FormBuilder);
  requestForm = this.fb.nonNullable.group({
    altcha: [],
    name: ['', [Validators.required]],
    slug: [null, [Validators.required]],
    eventDate: ['', [Validators.required]],
    location: ['', [Validators.required]],
    contact: ['', [Validators.required]],
    notices: ['', [Validators.required]],
  });

  constructor(private screenSizeService: ScreenSizeService) {
    this.isMobile = toSignal(this.screenSizeService.isMobile$, { initialValue: false });
    this.currentReview.update(() => ({[this.isMobile() ? 'slide1' : 'slide2']: true  } as any));
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

  submitRequest(): void {
    const form = this.requestForm.getRawValue();
    const body: IMail = {
      name: form.name.trim(),
      slug: `${form.slug}`,
      eventDate: fromNgbDate(form.eventDate as any),
      contact: form.contact.trim(),
      location: form.location.trim(),
      notices: form.notices.trim()
    }
    this.publicService.sendEmail(body).subscribe({
      next: () => {
        this.requestForm.reset();
        this.toast.success('Success', 'Cererea a fost trimisă cu succes!');
      }
    });
  }
}
