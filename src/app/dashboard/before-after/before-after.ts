import { Component, inject } from '@angular/core';
import { UploadPhotoModal } from '../upload-photo-modal/upload-photo-modal';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast.service';
import { startWith, Subject, switchMap } from 'rxjs';
import { FileService } from '../services/file.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { BeforeAfterService } from '../services/before-after.service';
import { DeleteModal } from '../../shared/delete-modal/delete-modal';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-before-after',
  imports: [CommonModule,RouterLink, NgbTooltip],
  templateUrl: './before-after.html',
  styleUrl: './before-after.scss',
})
export class BeforeAfter {
  modalService = inject(NgbModal);
  toast = inject(ToastService);
  fileService = inject(FileService);
  beforeAfterService = inject(BeforeAfterService);

    private refresh$ = new Subject<void>();

  beforeAfter = toSignal(
    this.refresh$.pipe(
      startWith(void 0), // initial load
      switchMap(() => this.beforeAfterService.list())
    ),
    { initialValue: { data: [], pagination: {}, success: true } }
  );

  openUploadPreviewModal(id?: number): void {
    const modalRef = this.modalService.open(UploadPhotoModal);
    modalRef.closed.subscribe((response) => {
      this.uploadFile(response, id);
    })
  }

  uploadFile(files: File[], id?: number) {
    this.toast.isLoading.set(true);
    this.beforeAfterService.create({ file: files [0], type: id ? 'after' : 'before', beforeAfterId: id }).subscribe({
        next: (res) => {
          // handle each response if needed
        },
        error: (err) => {
          console.error('Upload failed:', err);
          this.toast.isLoading.set(false);
        },
        complete: () => {
          this.toast.isLoading.set(false);
          this.toast.success('Success', 'Fișiere încărcate cu succces!')
        }
      });
  }

  openDeleteModal(id: number): void {
    const modalRef = this.modalService.open(DeleteModal);
    modalRef.componentInstance.modul = 'before-after';
    modalRef.componentInstance.id = id;
    modalRef.closed.subscribe(() => {
      this.deleteBeforeAfter(id);
    })
  }

  deleteBeforeAfter(id: number): void {
    this.beforeAfterService.delete(id).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Ștergere before-after', 'Success');
      },
      error: () => { }
    })
  }

  reload() {
    this.refresh$.next();
  }
}
