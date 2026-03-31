import { Component, effect, inject, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICategory } from '../interfaces/category.interface';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-category-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-category-modal.html',
  styleUrl: './add-category-modal.scss',
})
export class AddCategoryModal implements OnInit {
  activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);

  @Input() initialData?: ICategory;

  submitted = signal(false);

  categoryForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    slug: ['', [Validators.required]],
    status: ['active' as 'active' | 'inactive', Validators.required],
  });

  get f() {
    return this.categoryForm.controls;
  }

  ngOnInit() {
    if (this.initialData) {
      this.categoryForm.patchValue(this.initialData as any);
    }
  }

  submit() {
    this.submitted.set(true);

    if (this.categoryForm.invalid) return;

    const payload = this.categoryForm.getRawValue();
    this.activeModal.close(this.initialData ? {id: this.initialData.id, ...payload}: payload );
  }

  controlClasses(control: any) {
    return {
      'is-valid': this.submitted() && control.valid,
      'is-invalid': this.submitted() && control.invalid,
    };
  }
}
