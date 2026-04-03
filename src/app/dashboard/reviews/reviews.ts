import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { IReview } from '../interfaces/review.interface';
import { DeleteModal } from '../../shared/delete-modal/delete-modal';
import { AddReviewModal } from '../add-review-modal/add-review-modal';
import { ReviewService } from '../services/review.service';
import { ToastService } from '../services/toast.service';
import { startWith, Subject, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { EventService } from '../services/event.service';
import { CategoryService } from '../services/category.service';
import { ClientService } from '../services/client.service';
import { ReviewStatusPipe } from '../pipes/review-status-pipe';
import { PropByIdPipe } from '../pipes/prop-by-id-pipe';
import { ApproveReviewModal } from '../approve-review-modal/approve-review-modal';

@Component({
  selector: 'app-reviews',
  imports: [CommonModule, NgbTooltip, ReviewStatusPipe, PropByIdPipe],
  templateUrl: './reviews.html',
  styleUrl: './reviews.scss',
})
export class Reviews {
  reviewService = inject(ReviewService);
  toast = inject(ToastService);
  eventService = inject(EventService);
  categoryService = inject(CategoryService);
  clientService = inject(ClientService);

  categories = toSignal(this.categoryService.list(), { initialValue: { data: [], pagination: {}, success: true }});
  clients = toSignal(this.clientService.list(), { initialValue: { data: [], pagination: {}, success: true }});

  private refresh$ = new Subject<void>();

  reviews = toSignal(
    this.refresh$.pipe(
      startWith(void 0), // initial load
      switchMap(() => this.reviewService.list())
    ),
    { initialValue: { data: [], pagination: {}, success: true } }
  );

  private modalService = inject(NgbModal);

	openReviewModal(review?: IReview) {
		const modalRef = this.modalService.open(AddReviewModal);
    if (review) modalRef.componentInstance.initialData = {...review};
    modalRef.componentInstance.categories = [...this.categories()!.data];
    modalRef.componentInstance.clients = [...this.clients()!.data];
    modalRef.closed.subscribe((response) => {
      if (!response?.id) {
        this.createReview(response);
      } else {
        this.updateReview(response);
      }
    })
	}

  openDeleteModal(id: number): void {
    const modalRef = this.modalService.open(DeleteModal);
    modalRef.componentInstance.modul = 'recenzie';
    modalRef.componentInstance.name = id;
    modalRef.closed.subscribe(() => {
      this.deleteReview(id);
    })
  }

  openActionReviewModal(id: number, action: string): void {
    const modalRef = this.modalService.open(ApproveReviewModal);
    modalRef.componentInstance.action = action;
    modalRef.closed.subscribe(() => {
      this.updateReview({ id, status: action })
    })
  }

  createReview(review: IReview): void {
    this.reviewService.create(review).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Creare categorie', 'Success');
      },
      error: () => {}
    })
  }

  updateReview(review: Partial<IReview>): void {
    this.reviewService.update(review).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Actualizare recenzie', 'Success');
      },
      error: () => {}
    })
  }

  deleteReview(id: number): void {
    this.reviewService.delete(id).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Ștergere recenzie', 'Success');
      },
      error: () => {}
    })
  }

  reload() {
    this.refresh$.next();
  }
}
