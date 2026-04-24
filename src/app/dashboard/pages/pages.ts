import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith, Subject, switchMap } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { PageService } from '../services/page.service';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { IPage } from '../interfaces/page.interface';
import { AddPageModal } from '../add-page-modal/add-page-modal';
import { DeleteModal } from '../../shared/delete-modal/delete-modal';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pages',
  imports: [RouterLink, CommonModule, NgbTooltip],
  templateUrl: './pages.html',
  styleUrl: './pages.scss',
})
export class Pages {
  pageService = inject(PageService);
  toast = inject(ToastService);

  private refresh$ = new Subject<void>();

  pages = toSignal(
    this.refresh$.pipe(
      startWith(void 0), // initial load
      switchMap(() => this.pageService.list())
    ),
    { initialValue: { data: [], pagination: {}, success: true } }
  );

  private modalService = inject(NgbModal);

  openPageModal(page?: IPage) {
    const modalRef = this.modalService.open(AddPageModal);
    if (page) modalRef.componentInstance.initialData = { ...page };
    modalRef.closed.subscribe((response) => {
      if (!response?.id) {
        this.createPage(response);
      } else {
        this.updatePage(response);
      }
    })
  }

  openDeleteModal(id: number): void {
    const modalRef = this.modalService.open(DeleteModal);
    modalRef.componentInstance.modul = 'pagină';
    modalRef.componentInstance.id = id;
    modalRef.closed.subscribe(() => {
      this.deletePage(id);
    })
  }

  createPage(page: IPage): void {
    this.pageService.create(page).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Creare pagină', 'Success');
      },
      error: () => { }
    })
  }

  updatePage(page: IPage): void {
    this.pageService.update(page).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Actualizare pagină', 'Success');
      },
      error: () => { }
    })
  }

  deletePage(id: number): void {
    this.pageService.delete(id).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Ștergere pagină', 'Success');
      },
      error: () => { }
    })
  }

  reload() {
    this.refresh$.next();
  }
}
