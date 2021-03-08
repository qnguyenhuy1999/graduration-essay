import { toast } from 'react-toastify';
import {
  ToastSuccess,
  ToastError,
  ToastWarning,
} from 'app/components/ToastAlert';

/*
A wrapper for toast.
*/
class ToastAlertFactory {
  error(message: any, options?: object) {
    ToastError('Oops...', message, options);
  }

  warn(message: string, options?: object) {
    ToastWarning('Bad news...', message, options);
  }

  info(message: string, options?: object) {
    toast.info(message, options);
  }

  success(message: string, options?: object) {
    ToastSuccess('Success', message, options);
  }
}

// To use code completion in Editor
const ToastAlert = new ToastAlertFactory();
export default ToastAlert;
