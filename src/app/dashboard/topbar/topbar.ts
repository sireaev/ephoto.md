import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
	NgbDropdown,
	NgbDropdownToggle,
	NgbDropdownMenu,
	NgbDropdownItem,
	NgbDropdownButtonItem,
} from '@ng-bootstrap/ng-bootstrap/dropdown';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink, RouterLinkActive, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, NgbDropdownButtonItem],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
	constructor(public loadingService: ToastService) {}
}
