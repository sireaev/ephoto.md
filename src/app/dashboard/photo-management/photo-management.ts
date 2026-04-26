import { Component, inject, signal } from '@angular/core';
import { UploadPhotoModal } from '../upload-photo-modal/upload-photo-modal';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FileService } from '../services/file.service';
import { combineLatest, concatMap, from, map, of, startWith, Subject, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from '../interfaces/event.interface';
import { GetMBPipe } from '../pipes/get-mb-pipe';
import { DeleteModal } from '../../shared/delete-modal/delete-modal';

@Component({
  selector: 'app-photo-management',
  imports: [CommonModule, NgbTooltip, GetMBPipe],
  templateUrl: './photo-management.html',
  styleUrl: './photo-management.scss',
})
export class PhotoManagement {
  private route = inject(ActivatedRoute);
  modalService = inject(NgbModal);
  toast = inject(ToastService);
  fileService = inject(FileService);
  eventService = inject(EventService);

  private refresh$ = new Subject<void>();

  private eventId$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('eventId')))
  );

  event = signal<IEvent | null>(null);

  files = toSignal(
    combineLatest([
      this.eventId$,
      this.refresh$.pipe(startWith(void 0)) // trigger reloads
    ]).pipe(
      switchMap(([id]) => {
        if (!id) return of([]);
        return this.eventService.get(id).pipe(
          map((event) => {
            this.event.set(event.data);
            return event?.data.files || [];
          })
        );
      })
    ),
    { initialValue: [] }
  );

  openDeleteModal(id: number): void {
    const modalRef = this.modalService.open(DeleteModal);
    modalRef.componentInstance.modul = 'fișier';
    modalRef.componentInstance.name = id;
    modalRef.closed.subscribe(() => {
      this.deleteFile(id);
    })
  }

  deleteFile(id: number): void {
    this.fileService.delete(id).subscribe({
      next: () => {
        this.toast.success('Success', 'Ștergere fișier cu succes!');
        this.reload();
      }
    })
  }

  openUploadPhotoModal(): void {
    const modalRef = this.modalService.open(UploadPhotoModal);
    modalRef.closed.subscribe((response) => {
      this.uploadFilesInSeries(response);
    })
  }

  setMainPreviewFile(id: number): void {
    this.eventService.update({ id: this.event()!.id, previewFileId: id }).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Success', 'Setare poza principală cu success!');
      }
    })
  }

  uploadFilesInSeries(files: File[]) {
    this.toast.isLoading.set(true);
    from(files)
      .pipe(
        concatMap((file, index) =>
          this.fileService.upload(this.route.snapshot.params['eventId'], file).pipe(
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
          this.toast.isLoading.set(false);
          this.toast.success('Success', 'Fișiere încărcate cu succces!');
          
          this.reload();
        }
      });
  }

  reload() {
    this.refresh$.next();
  }
}
