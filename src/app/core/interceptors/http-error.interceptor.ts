import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { ToastService } from '@core/services/toast.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    tap({
      error: (error: HttpErrorResponse) => {
        const msg =
          error.status >= 500
            ? 'Server error. Please try again later.'
            : 'Request error.';
        toast.error(msg);
      },
    }),
  );
};
