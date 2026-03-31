import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EventService } from '../services/event.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { AddEventModal } from '../add-event-modal/add-event-modal';
import { startWith, Subject, switchMap } from 'rxjs';
import { IEvent } from '../interfaces/event.interface';
import { ToastService } from '../services/toast.service';
import { CategoryService } from '../services/category.service';
import { PropByIdPipe } from '../pipes/prop-by-id-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  imports: [CommonModule, PropByIdPipe, NgbTooltip, RouterLink],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events {
  toast = inject(ToastService);
  private refresh$ = new Subject<void>();
  eventService = inject(EventService);
  categoryService = inject(CategoryService);
  categories = toSignal(this.categoryService.list(), { initialValue: { data: [], pagination: {}, success: true }});
  events = toSignal(
    this.refresh$.pipe(
          startWith(void 0),
          switchMap(() => this.eventService.list())
        ),
        { initialValue: { data: [], pagination: {}, success: true } }
  );

  private modalService = inject(NgbModal);

	openEventModal(event?: IEvent) {
		const modalRef = this.modalService.open(AddEventModal);
		if (event) modalRef.componentInstance.initialData = event;
    modalRef.componentInstance.categories = [...this.categories()!.data];
    modalRef.closed.subscribe((response) => {
      if (response?.id) {
        this.updateEvent(response);
      } else {
        this.createEvent(response);
      }
    });
	}

  createEvent(event: IEvent): void {
    this.eventService.create(event).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Creare eveniment', 'Success');
      }
    })
  }

  updateEvent(event: IEvent): void {
    this.eventService.update(event).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Actualizare eveniment', 'Success');
      }
    })
  }

  reload() {
    this.refresh$.next();
  }
}
