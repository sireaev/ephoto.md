import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  isMobile$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isMobile$ = breakpointObserver.observe([
        Breakpoints.HandsetPortrait,
        Breakpoints.HandsetLandscape
    ]).pipe(
        map(result => result.matches),
        shareReplay()
    );
  }
  
}
