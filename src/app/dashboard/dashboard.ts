import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './sidebar/sidebar';
import { Topbar } from './topbar/topbar';

@Component({
  selector: 'app-dashboard',
  imports: [Topbar, Sidebar, RouterOutlet],
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html'
})
export class Dashboard {}
