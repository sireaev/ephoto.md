import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [NgClass, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
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
