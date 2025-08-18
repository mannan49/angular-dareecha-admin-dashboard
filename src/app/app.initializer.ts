import { AuthService } from "@shared/services/auth.service";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";



export function appInitializer(authService: AuthService) {
  return () =>
    authService.refreshToken().pipe(
      catchError(err => {
        // Handle failed refresh (e.g. log or just continue)
        console.error('[AppInitializer] Token refresh failed on startup:', err);
        return of(null);
      })
    );
}