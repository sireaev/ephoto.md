import { Component, inject } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { ActivatedRoute } from '@angular/router';
import { PublicService } from '../services/public.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhotoPreview } from '../photo-preview/photo-preview';

@Component({
  selector: 'app-event',
  imports: [Header, Footer, CommonModule],
  templateUrl: './event.html',
  styleUrl: './event.scss',
})
export class Event {
  private route = inject(ActivatedRoute);
  publicService = inject(PublicService);
  modalService = inject(NgbModal);
  events = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) =>
        this.publicService.eventFiles(Number(params.get('eventId')))
      )
    ),
    { initialValue: { data: [], pagination: {}, success: true } }
  );

  openPhoto(index: number) {
    const modalRef = this.modalService.open(PhotoPreview, {
      centered: true,
      backdropClass: 'preview-backdrop',
      modalDialogClass: 'preview-modal',

    });
    modalRef.componentInstance.startIndex = index;
    const isMobile = window.innerWidth <= 768;
    modalRef.componentInstance.images = this.events().data.map((e) =>
      isMobile ? e.mobileUrl : e.webUrl
    );
  }
}
