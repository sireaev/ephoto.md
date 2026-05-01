import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-main-content',
  imports: [NgClass, NgStyle, CommonModule, RouterLink],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent {
  adminPath = environment.path;
  kpis = [
    { label: 'Total Revenue', value: '$84,200', change: '+12.4% vs last month', trend: 1, icon: 'bi-currency-dollar', bg: '#e9f5ff', color: '#0095ff' },
    { label: 'New Orders', value: '1,430', change: '+8.2% vs last month', trend: 1, icon: 'bi-bag-fill', bg: '#e8fdf5', color: '#00d68f' },
    { label: 'Active Users', value: '9,621', change: '+3.7% vs last week', trend: 1, icon: 'bi-people-fill', bg: '#f0f4ff', color: '#3366ff' },
    { label: 'Churn Rate', value: '2.14%', change: '+0.3% vs last month', trend: -1, icon: 'bi-graph-down-arrow', bg: '#fff2f2', color: '#ff3d71' },
  ];

  bars = [
    { label: 'Jan', v1: 80, v2: 55 },
    { label: 'Feb', v1: 110, v2: 70 },
    { label: 'Mar', v1: 90, v2: 60 },
    { label: 'Apr', v1: 130, v2: 90 },
    { label: 'May', v1: 100, v2: 75 },
    { label: 'Jun', v1: 120, v2: 85 },
    { label: 'Jul', v1: 140, v2: 95 },
  ];

  trafficSources = [
    { label: 'Organic Search', pct: '66%', color: '#3366ff' },
    { label: 'Social Media',   pct: '35%', color: '#00d68f' },
    { label: 'Referrals',      pct: '22%', color: '#ffaa00' },
  ];

  transactions = [
    { id: '#8401', customer: 'Alice Monroe',  avatar: 'https://i.pravatar.cc/28?img=1',  product: 'Pro Plan',     date: 'Mar 28, 2026', amount: '$299.00', status: 'completed',  statusLabel: 'Completed' },
    { id: '#8402', customer: 'Ben Carter',    avatar: 'https://i.pravatar.cc/28?img=8',  product: 'Starter Pack', date: 'Mar 27, 2026', amount: '$49.00',  status: 'pending',    statusLabel: 'Pending' },
    { id: '#8403', customer: 'Carol Zhang',   avatar: 'https://i.pravatar.cc/28?img=5',  product: 'Enterprise',   date: 'Mar 26, 2026', amount: '$999.00', status: 'processing', statusLabel: 'Processing' },
    { id: '#8404', customer: 'David Kim',     avatar: 'https://i.pravatar.cc/28?img=12', product: 'Pro Plan',     date: 'Mar 25, 2026', amount: '$299.00', status: 'completed',  statusLabel: 'Completed' },
    { id: '#8405', customer: 'Eva Rodriguez', avatar: 'https://i.pravatar.cc/28?img=9',  product: 'Starter Pack', date: 'Mar 24, 2026', amount: '$49.00',  status: 'cancelled',  statusLabel: 'Cancelled' },
  ];
}
