import { Component, inject } from '@angular/core';
import { ToastService } from '../../dashboard/services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class ToastComponent {
   toastService = inject(ToastService);
}
