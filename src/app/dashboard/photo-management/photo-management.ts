import { Component, inject } from '@angular/core';
import { UploadPhotoModal } from '../upload-photo-modal/upload-photo-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FileService } from '../services/file.service';
import { startWith, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-photo-management',
  imports: [],
  templateUrl: './photo-management.html',
  styleUrl: './photo-management.scss',
})
export class PhotoManagement {
  modalService = inject(NgbModal);
  toast = inject(ToastService);
  fileService = inject(FileService);

  private refresh$ = new Subject<void>();

  photos = toSignal(
    this.refresh$.pipe(
      startWith(void 0), // initial load
      switchMap(() => this.fileService.list())
    ),
    { initialValue: { data: [], pagination: {}, success: true } }
  );

  openUploadPhotoModal(): void {
    const modalRef = this.modalService.open(UploadPhotoModal);
    modalRef.closed.subscribe((response) => {
      
    })
  }



  reload() {
    this.refresh$.next();
  }
}
