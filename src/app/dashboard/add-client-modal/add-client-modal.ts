import { Component, inject, Input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IClient } from '../interfaces/client.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-client-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-client-modal.html',
  styleUrl: './add-client-modal.scss',
})
export class AddClientModal {
  activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);

  @Input() initialData?: IClient;

  submitted = signal(false);

  clientForm = this.fb.nonNullable.group({
    displayName: [''],
  });

  get f() {
    return this.clientForm.controls;
  }

  ngOnInit() {
    if (this.initialData) {
      this.clientForm.patchValue(this.initialData as any);
    }
  }

  submit() {
    this.submitted.set(true);

    if (this.clientForm.invalid) return;

    const payload = this.clientForm.getRawValue();
    this.activeModal.close(this.initialData ? {id: this.initialData.id, ...payload}: payload );
  }

  controlClasses(control: any) {
    return {
      'is-valid': this.submitted() && control.valid,
      'is-invalid': this.submitted() && control.invalid,
    };
  }
}
