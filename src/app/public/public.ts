import { Component, CUSTOM_ELEMENTS_SCHEMA, Signal, signal, WritableSignal } from '@angular/core';
import { Header } from '../shared/header/header';
import { Footer } from '../shared/footer/footer';
import { NgClass } from '@angular/common'; 
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScreenSizeService } from '../shared/screen-size.service';
import { BehaviorSubject, map, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

type IHover = {
  [key: string]: boolean
}

@Component({
  selector: 'app-public',
  imports: [Header, Footer, NgClass, CarouselModule],
  templateUrl: './public.html',
  styleUrl: './public.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Public {
  currentReview = signal({'slide2': true});
  isHovered: IHover = {};
  
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
    // console.log('data', data);
    // this.currentReview[data.slides![1].id] = true;
    if (this.isMobile()) {
      this.currentReview.update((x: any) => ({[data.slides![0].id]: true  } as any));
    } else {
      this.currentReview.update((x: any) => ({[data.slides![1].id]: true  } as any));
    }
    // this.currentReview = this.currentReview;
    console.log('currentReview set to ', data.slides![ this.isMobile() ? 0 : 1].id)
  }
}
