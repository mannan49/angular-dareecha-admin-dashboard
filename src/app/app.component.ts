import { Component } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-tap-and-travel-user-frontend';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.refreshToken().subscribe();
  }
}
