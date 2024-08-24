import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor() { }

    showModal(title: string, text: string, icon: SweetAlertIcon = 'info', confirmButtonText: string = 'OK'): void {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: confirmButtonText
        });
    }

    showErrorModal(error: string): void {        
        Swal.fire({
            title: 'Error',
            text: error || 'Something went wrong!',
            icon: 'error',
            confirmButtonText: 'Close'
        });
    }

    showConfirmationModal(title: string, text: string, confirmButtonText: string = 'Yes', cancelButtonText: string = 'No'): Promise<boolean> {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText
        }).then(result => result.isConfirmed);
    }
}
