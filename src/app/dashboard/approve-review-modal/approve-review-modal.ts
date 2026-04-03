import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-approve-review-modal',
  imports: [NgClass],
  templateUrl: './approve-review-modal.html',
  styleUrl: './approve-review-modal.scss',
})
export class ApproveReviewModal {
  activeModal = inject(NgbActiveModal);
  @Input() action: string;

  handleReview(approve?: boolean): void {
    if (approve) {
      this.activeModal.close();
    } else {
      this.activeModal.dismiss();
    }
  }
}
