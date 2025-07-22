import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { ToastrService } from 'ngx-toastr';

describe('ToastService (with inject)', () => {
  let service: ToastService;
  let toastr: jest.Mocked<ToastrService>;

  beforeEach(() => {
    toastr = {
      success: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warning: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;

    TestBed.configureTestingModule({
      providers: [ToastService, { provide: ToastrService, useValue: toastr }],
    });

    service = TestBed.inject(ToastService);
  });

  it('calls toastr.success', () => {
    service.success('test');
    expect(toastr.success).toHaveBeenCalledWith('test');
  });

  it('should call toastr.error', () => {
    service.error('error');
    expect(toastr.error).toHaveBeenCalledWith('error');
  });

  it('should call toastr.info', () => {
    service.info('info');
    expect(toastr.info).toHaveBeenCalledWith('info');
  });

  it('should call toastr.warning', () => {
    service.warning('warn');
    expect(toastr.warning).toHaveBeenCalledWith('warn');
  });
});
