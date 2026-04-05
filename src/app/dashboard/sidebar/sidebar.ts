import { CommonModule, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { LogsService } from '../services/logs.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith, Subject, switchMap } from 'rxjs';
import { ParseLogPipe } from '../pipes/parse-log-pipe';
import { TimeAgoPipe } from '../pipes/time-ago-pipe';

@Component({
  selector: 'app-sidebar',
  imports: [NgClass, CommonModule, ParseLogPipe, TimeAgoPipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  toast = inject(ToastService);
  logsService = inject(LogsService);

  private refresh$ = new Subject<void>();

  logs = toSignal(
    this.refresh$.pipe(
      startWith(void 0), // initial load
      switchMap(() => this.logsService.list())
    ),
    { initialValue: { data: [], pagination: {}, success: true } }
  );

    activities = [
    { type: 'success', icon: 'bi-check-circle-fill', text: 'Ai editat evenimentul ID#101', time: '2 min ago' },
    { type: 'warning', icon: 'bi-exclamation-triangle-fill', text: 'Ai adaugat recenzia ID#44', time: '15 min ago' },
    { type: 'info', icon: 'bi-person-plus-fill', text: 'Utilizatorul Moderator2 a adaugat poza la evenimentl ID#5', time: '1 hr ago' },
    { type: 'danger', icon: 'bi-x-circle-fill', text: 'Utilizatorul Investor3 a adaugat o categorie noua', time: '3 hr ago' },
  ];

  team = [
    { name: 'Alice Monroe', avatar: 'https://i.pravatar.cc/34?img=1', status: 'online', statusLabel: 'Online' },
    { name: 'Ben Carter', avatar: 'https://i.pravatar.cc/34?img=8', status: 'away', statusLabel: 'Away' },
    { name: 'Carol Zhang', avatar: 'https://i.pravatar.cc/34?img=5', status: 'online', statusLabel: 'Online' },
    { name: 'David Kim', avatar: 'https://i.pravatar.cc/34?img=12', status: 'offline', statusLabel: 'Offline' },
  ];

  quickLinks = [
    { icon: 'bi-file-earmark-text', label: 'Documentation' },
    { icon: 'bi-shield-lock', label: 'Security Center' },
    { icon: 'bi-credit-card', label: 'Billing & Plans' },
    { icon: 'bi-headset', label: 'Support' },
  ];
}
