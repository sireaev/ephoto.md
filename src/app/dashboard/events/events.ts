import { shareReplay, startWith, Subject, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDateStruct, NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

import { AddEventModal } from '../add-event-modal/add-event-modal';

import { IEvent } from '../interfaces/event.interface';
import { PropByIdPipe } from '../pipes/prop-by-id-pipe';

import { EventService } from '../services/event.service';
import { ToastService } from '../services/toast.service';
import { CategoryService } from '../services/category.service';
import { ClientService } from '../services/client.service';
import { fromNgbDate } from '../../shared/date.util';
import { DeleteModal } from '../../shared/delete-modal/delete-modal';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-events',
  imports: [CommonModule, PropByIdPipe, NgbTooltip, RouterLink],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events {
  toast = inject(ToastService);
  private refresh$ = new Subject<void>();
  adminPath = environment.path;
  eventService = inject(EventService);
  categoryService = inject(CategoryService);
  clientService = inject(ClientService);
  categories = toSignal(this.categoryService.list(), { initialValue: { data: [], pagination: {}, success: true }});
  clients = toSignal(this.clientService.list(), { initialValue: { data: [], pagination: {}, success: true }});
  events = toSignal(
    this.refresh$.pipe(
          startWith(void 0),
          switchMap(() => this.eventService.list().pipe(shareReplay()))
        ),
        { initialValue: { data: [], pagination: {}, success: true } }
  );

  private modalService = inject(NgbModal);

	openEventModal(event?: IEvent) {
		const modalRef = this.modalService.open(AddEventModal);
		if (event) modalRef.componentInstance.initialData = event;
    modalRef.componentInstance.categories = [...this.categories()!.data];
    modalRef.componentInstance.clients = [...this.clients()!.data];
    modalRef.closed.subscribe((response) => {
      if (response?.id) {
        this.updateEvent(response);
      } else {
        this.createEvent(response);
      }
    });
	}

  openDeleteModal(id: number): void {
    const modalRef = this.modalService.open(DeleteModal);
    modalRef.componentInstance.modul = 'eveniment';
    modalRef.componentInstance.id = id;
    modalRef.closed.subscribe(() => {
      this.deleteEvent(id);
    })
  }

  createEvent(event: IEvent & { eventDate: NgbDateStruct}): void {
    this.eventService.create(this.parseEvent(event)).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Creare eveniment', 'Success');
      }
    })
  }

  updateEvent(event: IEvent & { eventDate: NgbDateStruct}): void {
    this.eventService.update(this.parseEvent(event)).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Actualizare eveniment', 'Success');
      }
    })
  }

  deleteEvent(id: number): void {
    this.eventService.delete(id).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Ștergere eveniment', 'Success');
      }
    })
  }

  private parseEvent(event: IEvent & { eventDate: NgbDateStruct }): IEvent {
    return {
      ...event,
      eventDate: fromNgbDate(event.eventDate)
    }
  }

  reload() {
    this.refresh$.next();
  }
}
