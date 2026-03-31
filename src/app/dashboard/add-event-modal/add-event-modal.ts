import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { IEvent } from '../interfaces/event.interface';
import { ICategory } from '../interfaces/category.interface';
import { toNgbDate } from '../../shared/date.util';

@Component({
  selector: 'app-add-event-modal',
  imports: [NgbInputDatepicker, ReactiveFormsModule, CommonModule],
  templateUrl: './add-event-modal.html',
  styleUrl: './add-event-modal.scss',
})
export class AddEventModal implements OnInit {
  activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  @Input() initialData?: IEvent;
  @Input() categories?: ICategory[] = [];
  submitted = signal(false);

  submit() {
    this.submitted.set(true);

    if (this.eventForm.invalid) return;

    this.activeModal.close(this.initialData ? { id: this.initialData?.id, ...this.eventForm.getRawValue() } : this.eventForm.getRawValue())
  }

  eventForm = this.fb.nonNullable.group({
    clientId: [null],
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    eventDate: [null, [Validators.required]],
    categoryId: [null, [Validators.required]],
  });

  get f() {
    return this.eventForm.controls;
  }

  ngOnInit() {
    if (this.initialData) {
      this.eventForm.patchValue({
        ...this.initialData, 
        eventDate: toNgbDate(this.initialData.eventDate) 
      } as any)
    }
  }
  
  controlClasses(control: any) {
    return {
      'is-valid': this.submitted() && control.valid,
      'is-invalid': this.submitted() && control.invalid,
      };
  }

  test(date: any): void {
    console.log('date', date);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      console.log('Selected file:', file);
    }
  }
}
