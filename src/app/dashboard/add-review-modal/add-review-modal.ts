import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IReview } from '../interfaces/review.interface';
import { ICategory } from '../interfaces/category.interface';
import { IClient } from '../interfaces/client.interface';

@Component({
  selector: 'app-add-review-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-review-modal.html',
  styleUrl: './add-review-modal.scss',
})
export class AddReviewModal {
  activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);

  @Input() initialData?: IReview;
  @Input() categories?: ICategory[] = [];
  @Input() clients?: IClient[] = [];

  submitted = signal(false);

  reviewForm = this.fb.nonNullable.group({
    clientId: ['', []],
    categoryId: ['', [Validators.required]],
    name: ['', [Validators.required]],
    message: ['', [Validators.required]],
    rating: ['', [Validators.max(5), Validators.min(1), Validators.maxLength(1)]],
    status: ['', [Validators.required]],
    moderationReason: ['', []],
  });

  get f() {
    return this.reviewForm.controls;
  }

  ngOnInit() {
    if (this.initialData) {
      this.reviewForm.patchValue(this.initialData as any);
      this.reviewForm.get('moderationReason')?.addValidators([Validators.required]);
    }
  }

  submit() {
    this.submitted.set(true);

    if (this.reviewForm.invalid) return;

    const payload = this.reviewForm.getRawValue();
    this.activeModal.close(this.initialData ? {id: this.initialData.id, ...payload}: payload );
  }

  controlClasses(control: any) {
    return {
      'is-valid': this.submitted() && control.valid,
      'is-invalid': this.submitted() && control.invalid,
    };
  }
}
