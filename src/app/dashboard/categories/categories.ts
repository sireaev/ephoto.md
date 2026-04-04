import { Component, inject } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { AddCategoryModal } from '../add-category-modal/add-category-modal';
import { CommonModule } from '@angular/common';
import { ICategory } from '../interfaces/category.interface';
import { ToastService } from '../services/toast.service';
import { concatMap, from, startWith, Subject, switchMap, tap } from 'rxjs';
import { DeleteModal } from '../../shared/delete-modal/delete-modal';
import { UploadPhotoModal } from '../upload-photo-modal/upload-photo-modal';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, NgbTooltip],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {
  categoryService = inject(CategoryService);
  toast = inject(ToastService);
  fileService = inject(FileService);

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
    if (category) modalRef.componentInstance.initialData = { ...category };
    modalRef.closed.subscribe((response) => {
      if (!response?.id) {
        this.createCategory(response);
      } else {
        this.updateCategory(response);
      }
    })
  }

  openUploadPreviewModal(id: number): void {
    const modalRef = this.modalService.open(UploadPhotoModal);
    modalRef.closed.subscribe((response) => {
      this.uploadFilesInSeries(response, id);
    })
  }

  uploadFilesInSeries(files: File[], id: number) {
    from(files)
      .pipe(
        concatMap((file, index) =>
          this.fileService.uploadCategoryPreview(id, file).pipe(
            tap(() => {
              console.log(`Uploaded ${index + 1}/${files.length}`);
            })
          )
        )
      )
      .subscribe({
        next: (res) => {
          // handle each response if needed
        },
        error: (err) => {
          console.error('Upload failed:', err);
        },
        complete: () => {
          this.toast.success('Success', 'Fișiere încărcate cu succces!')
        }
      });
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
        this.categoryService.list$.next(null);
        this.reload();
        this.toast.success('Creare categorie', 'Success');
      },
      error: () => { }
    })
  }

  updateCategory(category: ICategory): void {
    this.categoryService.update(category).subscribe({
      next: () => {
        this.categoryService.list$.next(null);
        this.reload();
        this.toast.success('Actualizare categorie', 'Success');
      },
      error: () => { }
    })
  }

  deleteCategory(id: number): void {
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.categoryService.list$.next(null);
        this.reload();
        this.toast.success('Ștergere categorie', 'Success');
      },
      error: () => { }
    })
  }

  reload() {
    this.refresh$.next();
  }
}
