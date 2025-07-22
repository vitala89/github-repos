import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastr: ToastrService = inject(ToastrService);

  success(message: string): void {
    this.toastr.success(message);
  }

  error(message: string): void {
    this.toastr.error(message);
  }

  info(message: string): void {
    this.toastr.info(message);
  }

  warning(message: string): void {
    this.toastr.warning(message);
  }
}
