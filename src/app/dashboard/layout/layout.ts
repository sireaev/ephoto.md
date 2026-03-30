import { Component } from '@angular/core';
import { Topbar } from '../topbar/topbar';
import { Sidebar } from '../sidebar/sidebar';
import { MainContent } from '../main-content/main-content';


@Component({
  selector: 'app-layout',
  imports: [Topbar, Sidebar, MainContent],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
