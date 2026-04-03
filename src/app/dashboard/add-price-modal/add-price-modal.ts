import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPrice } from '../interfaces/price.interface';

@Component({
  selector: 'app-add-price-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-price-modal.html',
  styleUrl: './add-price-modal.scss',
})
export class AddPriceModal {
  activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);

  @Input() initialData?: IPrice;

  submitted = signal(false);

  priceForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required]],
    status: ['', Validators.required],
    options: this.fb.array<FormControl<string>>([
      this.fb.nonNullable.control('', Validators.required),
    ]),
  });

  get f() {
    return this.priceForm.controls;
  }

  get options() {
    return this.priceForm.controls.options;
  }

  ngOnInit() {
    if (this.initialData) {
      this.priceForm.patchValue({
        name: this.initialData.name,
        price: this.initialData.price,
        status: this.initialData.status,
      });

      this.setOptions(this.initialData.options || []);
    }
  }

  setOptions(options: string[]) {
    this.options.clear();

    if (!options.length) {
      this.addOption(); // keep at least one input
      return;
    }

    options.forEach(option => {
      this.options.push(
        this.fb.nonNullable.control(option, Validators.required)
      );
    });
  }

  addOption() {
    this.options.push(
      this.fb.nonNullable.control('', Validators.required)
    );
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  submit() {
    this.submitted.set(true);

    if (this.priceForm.invalid) return;

    const payload = this.priceForm.getRawValue();

    payload.options = payload.options
      .map(o => o.trim())
      .filter(o => o.length > 0);

    this.activeModal.close(this.initialData ? { id: this.initialData.id, ...payload } : payload);
  }

  controlClasses(control: any) {
    return {
      'is-valid': this.submitted() && control.valid,
      'is-invalid': this.submitted() && control.invalid,
    };
  }
}
