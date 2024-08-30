import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/domain/models/user.model';
import { StorageService } from 'src/infrastructure/services/storage.service';

@Component({
  selector: 'app-new-services',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.css'],
})
export class NewServiceComponent implements OnInit {
  public userInformation: User | null = null;
  public serviceForm: FormGroup;
  public showOtroVehiculoInput: boolean = false;

  constructor(
    private storageService: StorageService,
    private formBuilder: FormBuilder
  ) {
    this.serviceForm = this.formBuilder.group({
      fechaDelServicio: ['', Validators.required],
      vehiculoDelServicio: ['', Validators.required],
      otroVehiculo: [''],
      direccionDeRecogida: ['', Validators.required],
      direccionDeLlegada: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.internalInit();
  }

  private internalInit() {
    this.setupEvents();
    if (this.userInformation?.cliente?.vehiculoTransportado) {
      this.serviceForm.patchValue({
        vehiculoDelServicio: 'Propio',
      });
    };
  }

  private setupEvents() {
    this.userInformation = this.storageService.getSessionStorage('userDetailsSession');
  }

  public onVehiculoChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.showOtroVehiculoInput = selectElement.value === 'Otro';
    if (!this.showOtroVehiculoInput) {
      this.serviceForm.get('otroVehiculo')?.setValue('');
    }
  }

  public onSubmit() {
    if (this.serviceForm.valid) {
      console.log(this.serviceForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
