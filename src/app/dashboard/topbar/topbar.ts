import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
	NgbDropdown,
	NgbDropdownToggle,
	NgbDropdownMenu,
	NgbDropdownItem,
	NgbDropdownButtonItem,
} from '@ng-bootstrap/ng-bootstrap/dropdown';
import { ToastService } from '../services/toast.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink, RouterLinkActive, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, NgbDropdownButtonItem, TitleCasePipe],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
	adminPath = environment.path;
	authService = inject(AuthService);
	user = this.authService.user;
	constructor(public loadingService: ToastService) {
		
		console.log('user', this.user);
	}
}
