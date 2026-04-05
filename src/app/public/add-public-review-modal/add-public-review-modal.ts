import { Component, inject, Input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICategory } from '../../dashboard/interfaces/category.interface';
import { IClient } from '../../dashboard/interfaces/client.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-public-review-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-public-review-modal.html',
  styleUrl: './add-public-review-modal.scss',
})
export class AddPublicReviewModal {
  activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);

  @Input() categories?: ICategory[] = [];
  @Input() clients?: IClient[] = [];

  submitted = signal(false);

  reviewForm = this.fb.nonNullable.group({
    categoryId: [null, [Validators.required]],
    name: ['', [Validators.required]],
    message: ['', [Validators.required]],
    rating: [null, []],
  });

  get f() {
    return this.reviewForm.controls;
  }

  submit() {
    this.submitted.set(true);

    if (this.reviewForm.invalid) return;

    const payload = this.reviewForm.getRawValue();
    this.activeModal.close(payload);
  }

  controlClasses(control: any) {
    return {
      'is-valid': this.submitted() && control.valid,
      'is-invalid': this.submitted() && control.invalid,
    };
  }
}
