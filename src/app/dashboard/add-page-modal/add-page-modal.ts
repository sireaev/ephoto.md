import { Component, inject, Input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPage } from '../interfaces/page.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-page-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-page-modal.html',
  styleUrl: './add-page-modal.scss',
})
export class AddPageModal {
  activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);

  @Input() initialData?: IPage;

  submitted = signal(false);

  pageForm = this.fb.group({
    type: ['', [Validators.required]],
    headerText: ['', [Validators.required]],
    headerTextClass: [''],
    paragraph1: [''],
    paragraph2: [''],
    paragraph1Class: [''],
    paragraph2Class: [''],
    buttonText: [''],
    buttonLink: [''],
  });

  get f() {
    return this.pageForm.controls;
  }

  ngOnInit() {
    if (this.initialData) {
      this.pageForm.patchValue({
        type: this.initialData.type,
        headerText: this.initialData.headerText,
        headerTextClass: this.initialData.headerTextClass,
        paragraph1: this.initialData.paragraph1,
        paragraph2: this.initialData.paragraph2,
        paragraph1Class: this.initialData.paragraph1Class,
        paragraph2Class: this.initialData.paragraph2Class,
        buttonText: this.initialData.buttonText,
        buttonLink: this.initialData.buttonLink,
      });
    }
  }

  submit() {
    this.submitted.set(true);

    if (this.pageForm.invalid) return;

    const payload = this.pageForm.getRawValue();

    this.activeModal.close(this.initialData ? { id: this.initialData.id, ...payload } : payload);
  }

  controlClasses(control: any) {
    return {
      'is-valid': this.submitted() && control.valid,
      'is-invalid': this.submitted() && control.invalid,
    };
  }
}
