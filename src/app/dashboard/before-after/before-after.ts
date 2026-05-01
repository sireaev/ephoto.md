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
import { environment } from '../../../environments/environment';
import { UpdateBeforeAfterModal } from '../update-before-after-modal/update-before-after-modal';
import { IBeforeAfter } from '../interfaces/before-after.interface';

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
  adminPath = environment.path;

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

  openBeforeAfterModal(beforeAfter: IBeforeAfter): void {
    const modalRef = this.modalService.open(UpdateBeforeAfterModal);
    modalRef.componentInstance.initialData = beforeAfter;
    modalRef.closed.subscribe((response) => {
      this.updateBeforeAfter(response, beforeAfter.id);
    })
  }

  updateBeforeAfter(beforeAfter: any, id?: number): void {
    this.beforeAfterService.update(beforeAfter, id).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Before-After', 'Actualizat cu succes!');
      },
      error: () => {
        this.toast.error('Before-After', 'Eroare la actualizare!');
      }
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
          this.reload();
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
