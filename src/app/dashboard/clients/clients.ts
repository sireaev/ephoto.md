import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../services/client.service';
import { ToastService } from '../services/toast.service';
import { startWith, Subject, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { IClient } from '../interfaces/client.interface';
import { AddClientModal } from '../add-client-modal/add-client-modal';
import { DeleteModal } from '../../shared/delete-modal/delete-modal';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-clients',
  imports: [CommonModule, NgbTooltip, RouterLink],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})
export class Clients {
  clientService = inject(ClientService);
  toast = inject(ToastService);
  adminPath = environment.path;

  private refresh$ = new Subject<void>();

  clients = toSignal(
    this.refresh$.pipe(
      startWith(void 0), // initial load
      switchMap(() => this.clientService.list())
    ),
    { initialValue: { data: [], pagination: {}, success: true } }
  );

  private modalService = inject(NgbModal);

	openClientModal(client?: IClient) {
		const modalRef = this.modalService.open(AddClientModal);
    if (client) modalRef.componentInstance.initialData = {...client};
    modalRef.closed.subscribe((response) => {
      if (!response?.id) {
        this.createCategory(response);
      } else {
        this.updateCategory(response);
      }
    })
	}

  openDeleteModal(id: number): void {
    const modalRef = this.modalService.open(DeleteModal);
    modalRef.componentInstance.modul = 'client';
    modalRef.componentInstance.id = id;
    modalRef.closed.subscribe(() => {
      this.deleteCategory(id);
    })
  }

  createCategory(client: IClient): void {
    this.clientService.list$.next(null);
    this.clientService.create(client).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Creare client', 'Success');
      },
      error: () => {}
    })
  }

  updateCategory(client: IClient): void {
    this.clientService.list$.next(null);
    this.clientService.update(client).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Actualizare client', 'Success');
      },
      error: () => {}
    })
  }

  deleteCategory(id: number): void {
    this.clientService.list$.next(null);
    this.clientService.delete(id).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Ștergere client', 'Success');
      },
      error: () => {}
    })
  }

  reload() {
    this.refresh$.next();
  }
}
