import { Component, inject } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { AddCategoryModal } from '../add-category-modal/add-category-modal';
import { CommonModule } from '@angular/common';
import { ICategory } from '../interfaces/category.interface';
import { ToastService } from '../services/toast.service';
import { startWith, Subject, switchMap } from 'rxjs';
import { DeleteModal } from '../../shared/delete-modal/delete-modal';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, NgbTooltip],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {
  categoryService = inject(CategoryService);
  toast = inject(ToastService);

  private refresh$ = new Subject<void>();

  categories = toSignal(
    this.refresh$.pipe(
      startWith(void 0), // initial load
      switchMap(() => this.categoryService.list())
    ),
    { initialValue: { data: [], pagination: {}, success: true } }
  );

  private modalService = inject(NgbModal);

	openCategoryModal(category?: ICategory) {
		const modalRef = this.modalService.open(AddCategoryModal);
    if (category) modalRef.componentInstance.initialData = {...category};
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
    modalRef.componentInstance.modul = 'categorie';
    modalRef.componentInstance.id = id;
    modalRef.closed.subscribe(() => {
      this.deleteCategory(id);
    })
  }

  createCategory(category: ICategory): void {
    this.categoryService.create(category).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Creare categorie', 'Success');
      },
      error: () => {}
    })
  }

  updateCategory(category: ICategory): void {
    this.categoryService.update(category).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Actualizare categorie', 'Success');
      },
      error: () => {}
    })
  }

  deleteCategory(id: number): void {
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Stergere categorie', 'Success');
      },
      error: () => {}
    })
  }

  reload() {
    this.refresh$.next();
  }
}
