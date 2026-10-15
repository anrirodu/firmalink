import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

/**
 * ThemeService — Gestiona el tema claro/oscuro de la aplicación.
 * Persiste la preferencia del usuario en localStorage y aplica
 * el atributo `data-theme="dark"` en el <body>.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'firmalink-theme';

  readonly isDark = signal<boolean>(this.loadInitial());

  constructor() {
    this.apply(this.isDark());
  }

  toggle(): void {
    this.set(!this.isDark());
  }

  set(dark: boolean): void {
    this.isDark.set(dark);
    localStorage.setItem(this.STORAGE_KEY, dark ? 'dark' : 'light');
    this.apply(dark);
  }

  private apply(dark: boolean): void {
    const body = document.body;
    if (dark) {
      body.setAttribute('data-theme', 'dark');
    } else {
      body.removeAttribute('data-theme');
    }
  }

  private loadInitial(): boolean {
    // Por defecto: tema claro (light)
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved === 'dark';
  }
}
