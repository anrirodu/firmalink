import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingScreenService } from './shared/services/loading-screen.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: [`:host { display: block; height: 100vh; }`],
})
export class App {
  // Inyectar para que se active y quite el loading screen
  private loadingScreen = inject(LoadingScreenService);
}
