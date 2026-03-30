import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  header: string;
  message: string;
  details: string;
  classname?: string;
  delay?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<Toast[]>([]);

  toasts = this._toasts.asReadonly();

  show(
    header: string,
    message: string,
    details: string,
    classname = 'bg-danger text-white',
    delay = 3000
  ) {
    const toast: Toast = {
      id: Date.now(),
      header,
      message,
      details,
      classname,
      delay,
    };

    this._toasts.update(current => [...current, toast]);

    // auto remove
    if (delay > 0) {
      setTimeout(() => this.remove(toast.id), delay);
    }
  }

  remove(id: number) {
    this._toasts.update(current =>
      current.filter(t => t.id !== id)
    );
  }

  clear() {
    this._toasts.set([]);
  }

  // helpers
  success(header = 'Success', message: string, details: string = '') {
    this.show(header, message, details);
  }

  error(header = 'Error', message: string, details: string = '') {
    this.show(header, message, details);
  }

  info(header = 'Info', message: string, details: string = '') {
    this.show(header, message, details);
  }
}
