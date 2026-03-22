import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgbDropdownModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
