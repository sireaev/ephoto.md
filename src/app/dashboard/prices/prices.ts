import { Component, inject } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { PriceService } from '../services/price.service';
import { startWith, Subject, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { IPrice } from '../interfaces/price.interface';
import { AddPriceModal } from '../add-price-modal/add-price-modal';
import { DeleteModal } from '../../shared/delete-modal/delete-modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prices',
  imports: [CommonModule, NgbTooltip],
  templateUrl: './prices.html',
  styleUrl: './prices.scss',
})
export class Prices {
  priceService = inject(PriceService);
  toast = inject(ToastService);

  private refresh$ = new Subject<void>();

  prices = toSignal(
    this.refresh$.pipe(
      startWith(void 0), // initial load
      switchMap(() => this.priceService.list())
    ),
    { initialValue: { data: [], pagination: {}, success: true } }
  );

  private modalService = inject(NgbModal);

	openPriceModal(price?: IPrice) {
		const modalRef = this.modalService.open(AddPriceModal);
    if (price) modalRef.componentInstance.initialData = {...price};
    modalRef.closed.subscribe((response) => {
      if (!response?.id) {
        this.createPrice(response);
      } else {
        this.updatePrice(response);
      }
    })
	}

  openDeleteModal(id: number): void {
    const modalRef = this.modalService.open(DeleteModal);
    modalRef.componentInstance.modul = 'blocul';
    modalRef.componentInstance.id = id;
    modalRef.closed.subscribe(() => {
      this.deletePrice(id);
    })
  }

  createPrice(price: IPrice): void {
    this.priceService.create(price).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Creare bloc de prețuri', 'Success');
      },
      error: () => {}
    })
  }

  updatePrice(price: IPrice): void {
    this.priceService.update(price).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Actualizare bloc de prețuri', 'Success');
      },
      error: () => {}
    })
  }

  deletePrice(id: number): void {
    this.priceService.delete(id).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Ștergere bloc de prețuri', 'Success');
      },
      error: () => {}
    })
  }

  reload() {
    this.refresh$.next();
  }
}
