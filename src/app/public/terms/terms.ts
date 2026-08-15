import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms',
  imports: [Header, Footer, RouterLink],
  templateUrl: './terms.html',
})
export class Terms {}
