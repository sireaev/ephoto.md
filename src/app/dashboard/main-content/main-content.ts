import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { LogsService } from '../services/logs.service';
import { switchMap } from 'rxjs';
import { HighchartsChartComponent } from 'highcharts-angular';
import type Highcharts from 'highcharts';

@Component({
  selector: 'app-main-content',
  imports: [NgClass, NgStyle, CommonModule, RouterLink, HighchartsChartComponent],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent {
  adminPath = environment.path;

  // bars = [
  //   { label: 'Jan', v1: 80, v2: 10 },
  //   { label: 'Feb', v1: 110, v2: 70 },
  //   { label: 'Mar', v1: 90, v2: 60 },
  //   { label: 'Apr', v1: 130, v2: 90 },
  //   { label: 'May', v1: 100, v2: 75 },
  //   { label: 'Jun', v1: 120, v2: 85 },
  //   { label: 'Jul', v1: 140, v2: 95 },
  // ];
  logsService = inject(LogsService);

  view = signal<'monthly' | 'weekly' | 'daily'>('monthly');
  bars = toSignal(
    toObservable(this.view).pipe(
      switchMap((view) => this.logsService.barStats(view))
    ),
    { initialValue: { data: [], labels: [] } }
  )

  browserStats = toSignal(
    this.logsService.browserStats(),
    { initialValue: { data: { labels: [] as string[], data: [] as number[] }, success: true } }
   );

  donutChartOptions = computed<Highcharts.Options>(() => {
    const labels = this.browserStats()?.data?.labels || [];
    const data = this.browserStats()?.data?.data || [];

    const total = data.reduce((sum: any, n: any) => sum + (n || 0), 0);
    const maxIdx = data.reduce((bestIdx: any, n: any, i: any, arr: any) => (n > arr[bestIdx] ? i : bestIdx), 0);
    const topPct = total > 0 ? Math.round((data[maxIdx] / total) * 100) : 0;
    const topLabel = labels[maxIdx] ?? '';

    return {
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
        spacing: [8, 8, 8, 8],
      },
      title: {
        text: total > 0 ? `${topPct}%` : '',
        align: 'center',
        verticalAlign: 'middle',
        floating: true,
        y: -8,
        style: { color: '#222b45', fontSize: '20px', fontWeight: '700' },
      },
      subtitle: {
        text: topLabel,
        align: 'center',
        verticalAlign: 'middle',
        floating: true,
        y: 14,
        style: { color: '#8f9bb3', fontSize: '10px' },
      },
      credits: { enabled: false },
      legend: {
        align: 'center',
        itemStyle: { color: '#8f9bb3', fontSize: '12px', fontWeight: '400' },
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> ({point.percentage:.1f}%)',
      },
      plotOptions: {
        pie: {
          size: '85%',
          innerSize: '65%',
          borderWidth: 0,
          showInLegend: true,
          dataLabels: { enabled: false },
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Vizitatori',
          colors: ['#3366ff', '#00d68f', '#ffaa00', '#ff3d71'],
          data: labels.map((label: any, i: any) => ({ name: label, y: data[i] ?? 0 })),
        },
      ],
    };
  });

  chartOptions = computed<Highcharts.Options>(() => {
    const data = this.bars()?.data || [];
    const labels = this.bars()?.labels || [];

    return {
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
        spacing: [8, 0, 0, 0],
      },
      title: { text: '' },
      credits: { enabled: false },
      legend: {
        align: 'left',
        itemStyle: { color: '#8f9bb3', fontSize: '12px', fontWeight: '400' },
      },
      xAxis: {
        categories: labels,
        lineColor: '#e4e9f2',
        tickColor: '#e4e9f2',
        labels: { style: { color: '#8f9bb3', fontSize: '10px' } },
      },
      yAxis: {
        title: { text: '' },
        gridLineColor: '#e4e9f2',
        labels: { style: { color: '#8f9bb3', fontSize: '10px' } },
      },
      tooltip: { shared: true },
      plotOptions: {
        column: {
          borderRadius: 4,
          borderWidth: 0,
          pointPadding: 0.1,
          groupPadding: 0.15,
        },
      },
      series: [
        {
          type: 'column',
          name: '2025',
          data: data.map((b) => b.v1),
          color: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#3366ff'],
              [1, '#598bff'],
            ],
          },
        },
        {
          type: 'column',
          name: '2026',
          data: data.map((b) => b.v2),
          color: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#00d68f'],
              [1, '#00b887'],
            ],
          },
        },
      ],
    };
  });

  audienceStats = toSignal(
    this.logsService.audienceStats(),
    { initialValue: { data: {  }, success: true } }
   );

  kpis = computed(() => {
    const stats: any = this.audienceStats()?.data || {};
    const views = stats.views || { current: 0, previous: 0, difference: 0 };
    const newUsers = stats.newUsers || { current: 0, previous: 0 };
    const activeUsers = stats.activeUsers || { current: 0, previous: 0 };
    const disappearing = stats.disappearing || { currentRate: 0, lastMonthLostUsers: 0 };

    const formatChange = (current: number, previous: number, period: string) => {
      const diff = current - previous;
      if (previous > 0) {
        const pct = (diff / previous) * 100;
        return `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}% vs ${period}`;
      }
      return `${diff >= 0 ? '+' : ''}${diff} vs ${period}`;
    };

    return [
      {
        label: 'Total Utilizatori',
        value: String(views.current ?? 0),
        change: formatChange(views.current ?? 0, views.previous ?? 0, 'ultima lună'),
        trend: (views.difference ?? (views.current - views.previous)) >= 0 ? 1 : -1,
        icon: 'bi-currency-dollar', bg: '#e9f5ff', color: '#0095ff',
      },
      {
        label: 'Utilizatori noi',
        value: String(newUsers.current ?? 0),
        change: formatChange(newUsers.current ?? 0, newUsers.previous ?? 0, 'ultima lună'),
        trend: (newUsers.current - newUsers.previous) >= 0 ? 1 : -1,
        icon: 'bi-bag-fill', bg: '#e8fdf5', color: '#00d68f',
      },
      {
        label: 'Utilizatori activi',
        value: String(activeUsers.current ?? 0),
        change: formatChange(activeUsers.current ?? 0, activeUsers.previous ?? 0, 'ultima lună'),
        trend: (activeUsers.current - activeUsers.previous) >= 0 ? 1 : -1,
        icon: 'bi-people-fill', bg: '#f0f4ff', color: '#3366ff',
      },
      {
        label: 'Utilizatori pierduți',
        value: `${disappearing.currentRate ?? 0}%`,
        change: `${disappearing.lastMonthLostUsers ?? 0} vs pierduți luna trecută`,
        trend: (disappearing.currentRate ?? 0) > 0 ? -1 : 1,
        icon: 'bi-graph-down-arrow', bg: '#fff2f2', color: '#ff3d71',
      },
    ];
  });

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
