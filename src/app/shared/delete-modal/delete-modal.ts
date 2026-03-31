import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  imports: [],
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.scss',
})
export class DeleteModal {
  activeModal = inject(NgbActiveModal);
  @Input() modul: string;
  @Input() name: string;

  delete(response?: boolean): void {
    if (response) {
      this.activeModal.close();
    } else {
      this.activeModal.dismiss();
    }
  }
}
