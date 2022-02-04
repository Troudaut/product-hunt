import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IndividualConfig } from 'ngx-toastr/toastr/toastr-config';
import { ActiveToast } from 'ngx-toastr/toastr/toastr.service';

export interface PopupConfig {
  title?: string;
  override?: Partial<IndividualConfig>;
}

enum PopupType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

const DEFAULT_ERROR_CONFIG: PopupConfig = {
  title: 'Error',
  override: {
    timeOut: 4000,
    positionClass: 'toast-top-right'
  }
};

const DEFAULT_SUCCESS_CONFIG: PopupConfig = {
  title: 'Success',
  override: {
    timeOut: 2000,
    positionClass: 'toast-top-right'
  }
};

const DEFAULT_CONFIG: PopupConfig = {
  override: {
    timeOut: 2000,
    positionClass: 'toast-top-right'
  }
};

const DEFAULT_TITLES: {[key in PopupType]: string} = {
  success: 'Succes',
  error: 'Error',
  warning: 'Warning',
  info: 'Info',
};

const DEFAULT_CLASSES: {[key in PopupType]: string} = {
  success: 'toast-success',
  error: 'toast-error',
  warning: 'toast-warning',
  info: 'toast-info',
};

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private toastrService: ToastrService
  ) {
  }

  showError(message?: string, popupConfig: PopupConfig = {}): ActiveToast<any> {
    return this.showWithConfig(PopupType.ERROR, message, popupConfig, DEFAULT_ERROR_CONFIG);
  }

  showSuccess(message?: string, popupConfig: PopupConfig = {}): ActiveToast<any> {
    return this.showWithConfig(PopupType.SUCCESS, message, popupConfig, DEFAULT_SUCCESS_CONFIG);
  }

  show(type: PopupType, message?: string, popupConfig: PopupConfig = {}): ActiveToast<any> {
    return this.showWithConfig(type, message, popupConfig);
  }

  private showWithConfig(type: PopupType, message?: string, popupConfig: PopupConfig = {}, defaultConfig: PopupConfig = DEFAULT_CONFIG): ActiveToast<any> {
    const override = Object.assign({}, defaultConfig.override, popupConfig.override);
    const config = Object.assign({}, defaultConfig, { title: DEFAULT_TITLES[type] }, popupConfig, { override: override });
    return this.toastrService.show(
      message,
      config.title,
      config.override,
      DEFAULT_CLASSES[type]
    );
  }
}
