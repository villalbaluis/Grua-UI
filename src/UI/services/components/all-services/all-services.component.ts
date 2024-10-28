// components/service-list/service-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Service } from '../../../../domain/interfaces/service.interface';
import { ServiceManagementService } from '../../../../infrastructure/services/service-management.service';
import { ServiceFormService } from '../../../../infrastructure/services/service-form.service';
import { ModalService } from '../../../../infrastructure/services/modal.service';

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.css']
})
export class AllServicesComponent implements OnInit {
  services: Service[] = [];

  constructor(
    private serviceManagement: ServiceManagementService,
    private serviceForm: ServiceFormService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.loadServices();
  }

  private loadServices(): void {
    this.services = this.serviceManagement.getAllServices();
  }

  async handleDelete(service: Service): Promise<void> {
    const confirmed = await this.modalService.showConfirmationModal(
      'Eliminar Servicio',
      '¿Está seguro que desea eliminar este servicio?'
    );

    if (confirmed) {
      this.serviceManagement.deleteServiceById(service.id);
      this.loadServices();
      this.modalService.showModal('Éxito', 'Servicio eliminado correctamente', 'success');
    }
  }

  async handleView(service: Service): Promise<void> {
    await this.serviceForm.showDetailsForm(service);
  }

  async handleEdit(service: Service): Promise<void> {
    const updatedService = await this.serviceForm.showEditForm(service);

    if (updatedService) {
      this.serviceManagement.updateService(updatedService);
      this.loadServices();
      this.modalService.showModal('Éxito', 'Servicio actualizado correctamente', 'success');
    }
  }
}