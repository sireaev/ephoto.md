import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  DropzoneComponent,
  FileInputDirective,
  FileInputValidators,
} from '@ngx-dropzone/cdk';

@Component({
  selector: 'app-upload-photo-modal',
  imports: [
    ReactiveFormsModule,
    DropzoneComponent,
    FileInputDirective,
  ],
  templateUrl: './upload-photo-modal.html',
  styleUrl: './upload-photo-modal.scss',
})
export class UploadPhotoModal {
  activeModal = inject(NgbActiveModal);
  submit(): void {
    const files = this.fileCtrl.value;

    if (!files?.length) return;

    this.activeModal.close(files); // 👈 return files to parent
  }

  fileCtrl = new FormControl<File[] | null>(null, [
    FileInputValidators.accept('image/*'),
    FileInputValidators.maxSize(5 * 1024 * 1024), // 5MB
  ]);

  getFileCount(): number {
    const value = this.fileCtrl.value;
    return Array.isArray(value) ? value.length : value ? 1 : 0;
  }

  private previewMap = new Map<File, string>();

  getPreview(file: File): string {
    if (!this.previewMap.has(file)) {
      const url = URL.createObjectURL(file);
      this.previewMap.set(file, url);
    }
    return this.previewMap.get(file)!;
  }

  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  // Optional: cleanup (VERY important to avoid memory leaks)
  ngOnDestroy() {
    this.previewMap.forEach((url) => URL.revokeObjectURL(url));
  }
}
