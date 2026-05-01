import { Component, inject, Input, signal } from '@angular/core';
import { IBeforeAfter } from '../interfaces/before-after.interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-before-after-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-before-after-modal.html',
  styleUrl: './update-before-after-modal.scss',
})
export class UpdateBeforeAfterModal {
  activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);

  @Input() initialData?: IBeforeAfter;

  submitted = signal(false);

  beforeAfterForm = this.fb.nonNullable.group({
    width: [''],
    row: [''],
    order: [''],
  });

  get f() {
    return this.beforeAfterForm.controls;
  }

  ngOnInit() {
    if (this.initialData) {
      this.beforeAfterForm.patchValue(this.initialData as any);
    }
  }

  submit() {
    this.submitted.set(true);

    if (this.beforeAfterForm.invalid) return;

    const payload = this.beforeAfterForm.getRawValue();
    this.activeModal.close(this.initialData ? {id: this.initialData.id, ...payload}: payload );
  }

  controlClasses(control: any) {
    return {
      'is-valid': this.submitted() && control.valid,
      'is-invalid': this.submitted() && control.invalid,
    };
  }
}
