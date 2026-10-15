import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  countdown = signal(10);
  private _timerSubscription: any;
  private _unsubscribeAll = new Subject<void>();

  constructor(private _location: Location, private router: Router) {}

  ngOnInit(): void {
    this._timerSubscription = timer(0, 1000)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        if (this.countdown() > 0) {
          this.countdown.update(c => c - 1);
        } else {
          this.goBack();
        }
      });
  }

  goBack(): void {
    // Si no hay historial previo, redirigir al login
    if (window.history.length <= 1) {
      this.router.navigate(['/login']);
      return;
    }
    this._location.back();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(undefined);
    this._unsubscribeAll.complete();
    if (this._timerSubscription) {
      this._timerSubscription.unsubscribe();
    }
  }
}
