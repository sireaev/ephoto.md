import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  imports: [Header, Footer, RouterLink],
  templateUrl: './privacy-policy.html',
})
export class PrivacyPolicy {}
