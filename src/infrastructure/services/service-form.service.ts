import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Service } from '../../domain/interfaces/service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceFormService {
  constructor() {}

  async showDetailsForm(service: Service): Promise<void> {
    await Swal.fire({
      title: 'Detalles del Equipo',
      html: `
        <div class="container">
          <div class="row">
            <div class="col-md-12 mb-4">
              <h5 class="border-bottom pb-2">Hardware</h5>
              <div class="row">
                <div class="col-md-3"><strong>CPU:</strong> ${service.hardware.cpu}</div>
                <div class="col-md-3"><strong>Monitor:</strong> ${service.hardware.monitor}</div>
                <div class="col-md-3"><strong>Teclado:</strong> ${service.hardware.keyboard}</div>
                <div class="col-md-3"><strong>Mouse:</strong> ${service.hardware.mouse}</div>
              </div>
              <div class="row mt-2">
                <div class="col-md-3"><strong>All-in-One:</strong> ${service.hardware.isAllInOne ? 'Sí' : 'No'}</div>
                <div class="col-md-3"><strong>AOI:</strong> ${service.hardware.hasAOI ? 'Sí' : 'No'}</div>
                <div class="col-md-3"><strong>Portátil:</strong> ${service.hardware.isLaptop ? 'Sí' : 'No'}</div>
                <div class="col-md-3"><strong>Procesador:</strong> ${service.hardware.processor}</div>
              </div>
            </div>

            <div class="col-md-6 mb-4">
              <h5 class="border-bottom pb-2">Disco Duro</h5>
              <p><strong>Capacidad:</strong> ${service.hardDrive.capacity}</p>
              <p><strong>Tipo:</strong> ${service.hardDrive.type}</p>
              <p><strong>Marca:</strong> ${service.hardDrive.brand}</p>
            </div>

            <div class="col-md-6 mb-4">
              <h5 class="border-bottom pb-2">RAM</h5>
              <p><strong>Capacidad:</strong> ${service.ram.capacity}</p>
              <p><strong>Tipo:</strong> ${service.ram.type}</p>
              <p><strong>Marca:</strong> ${service.ram.brand}</p>
            </div>
          </div>
        </div>
      `,
      width: '80%',
      confirmButtonText: 'Cerrar'
    });
  }

  async showEditForm(service: Service): Promise<Service | null> {
    const { value: formValues } = await Swal.fire({
      title: 'Editar Equipo',
      html: `
        <form id="editForm" class="container">
          <div class="row">
            <!-- Hardware Section -->
            <div class="col-12 mb-4">
              <h5 class="border-bottom pb-2">Hardware</h5>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="cpu" class="form-label">CPU</label>
                  <input type="text" class="form-control" id="cpu" value="${service.hardware.cpu}">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="monitor" class="form-label">Monitor</label>
                  <input type="text" class="form-control" id="monitor" value="${service.hardware.monitor}">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="keyboard" class="form-label">Teclado</label>
                  <input type="text" class="form-control" id="keyboard" value="${service.hardware.keyboard}">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="mouse" class="form-label">Mouse</label>
                  <input type="text" class="form-control" id="mouse" value="${service.hardware.mouse}">
                </div>
                <div class="col-md-4 mb-3">
                  <label for="isAllInOne" class="form-label">All-in-One</label>
                  <select class="form-select" id="isAllInOne">
                    <option value="true" ${service.hardware.isAllInOne ? 'selected' : ''}>Sí</option>
                    <option value="false" ${!service.hardware.isAllInOne ? 'selected' : ''}>No</option>
                  </select>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="hasAOI" class="form-label">AOI</label>
                  <select class="form-select" id="hasAOI">
                    <option value="true" ${service.hardware.hasAOI ? 'selected' : ''}>Sí</option>
                    <option value="false" ${!service.hardware.hasAOI ? 'selected' : ''}>No</option>
                  </select>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="isLaptop" class="form-label">Portátil</label>
                  <select class="form-select" id="isLaptop">
                    <option value="true" ${service.hardware.isLaptop ? 'selected' : ''}>Sí</option>
                    <option value="false" ${!service.hardware.isLaptop ? 'selected' : ''}>No</option>
                  </select>
                </div>
                <div class="col-12 mb-3">
                  <label for="processor" class="form-label">Procesador</label>
                  <input type="text" class="form-control" id="processor" value="${service.hardware.processor}">
                </div>
              </div>
            </div>

            <!-- Hard Drive Section -->
            <div class="col-md-6 mb-4">
              <h5 class="border-bottom pb-2">Disco Duro</h5>
              <div class="mb-3">
                <label for="hdCapacity" class="form-label">Capacidad</label>
                <input type="text" class="form-control" id="hdCapacity" value="${service.hardDrive.capacity}">
              </div>
              <div class="mb-3">
                <label for="hdType" class="form-label">Tipo</label>
                <input type="text" class="form-control" id="hdType" value="${service.hardDrive.type}">
              </div>
              <div class="mb-3">
                <label for="hdBrand" class="form-label">Marca</label>
                <input type="text" class="form-control" id="hdBrand" value="${service.hardDrive.brand}">
              </div>
            </div>

            <!-- RAM Section -->
            <div class="col-md-6 mb-4">
              <h5 class="border-bottom pb-2">RAM</h5>
              <div class="mb-3">
                <label for="ramCapacity" class="form-label">Capacidad</label>
                <input type="text" class="form-control" id="ramCapacity" value="${service.ram.capacity}">
              </div>
              <div class="mb-3">
                <label for="ramType" class="form-label">Tipo</label>
                <input type="text" class="form-control" id="ramType" value="${service.ram.type}">
              </div>
              <div class="mb-3">
                <label for="ramBrand" class="form-label">Marca</label>
                <input type="text" class="form-control" id="ramBrand" value="${service.ram.brand}">
              </div>
            </div>
          </div>
        </form>
      `,
      width: '80%',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        return {
          id: service.id,
          hardware: {
            cpu: (document.getElementById('cpu') as HTMLInputElement).value,
            monitor: (document.getElementById('monitor') as HTMLInputElement).value,
            keyboard: (document.getElementById('keyboard') as HTMLInputElement).value,
            mouse: (document.getElementById('mouse') as HTMLInputElement).value,
            isAllInOne: (document.getElementById('isAllInOne') as HTMLSelectElement).value === 'true',
            hasAOI: (document.getElementById('hasAOI') as HTMLSelectElement).value === 'true',
            isLaptop: (document.getElementById('isLaptop') as HTMLSelectElement).value === 'true',
            processor: (document.getElementById('processor') as HTMLInputElement).value
          },
          hardDrive: {
            capacity: (document.getElementById('hdCapacity') as HTMLInputElement).value,
            type: (document.getElementById('hdType') as HTMLInputElement).value,
            brand: (document.getElementById('hdBrand') as HTMLInputElement).value
          },
          ram: {
            capacity: (document.getElementById('ramCapacity') as HTMLInputElement).value,
            type: (document.getElementById('ramType') as HTMLInputElement).value,
            brand: (document.getElementById('ramBrand') as HTMLInputElement).value
          }
        };
      }
    });

    return formValues || null;
  }

  async showCreateForm(): Promise<Service | null> {
    const { value: formValues } = await Swal.fire({
      title: 'Nuevo Equipo',
      html: `
        <form id="createForm" class="container">
          <div class="row">
            <!-- Hardware Section -->
            <div class="col-12 mb-4">
              <h5 class="border-bottom pb-2">Hardware</h5>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="cpu" class="form-label">CPU</label>
                  <input type="text" class="form-control" id="cpu" placeholder="Ingrese el CPU">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="monitor" class="form-label">Monitor</label>
                  <input type="text" class="form-control" id="monitor" placeholder="Ingrese el monitor">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="keyboard" class="form-label">Teclado</label>
                  <input type="text" class="form-control" id="keyboard" placeholder="Ingrese el teclado">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="mouse" class="form-label">Mouse</label>
                  <input type="text" class="form-control" id="mouse" placeholder="Ingrese el mouse">
                </div>
                <div class="col-md-4 mb-3">
                  <label for="isAllInOne" class="form-label">All-in-One</label>
                  <select class="form-select" id="isAllInOne">
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="hasAOI" class="form-label">AOI</label>
                  <select class="form-select" id="hasAOI">
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="isLaptop" class="form-label">Portátil</label>
                  <select class="form-select" id="isLaptop">
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div class="col-12 mb-3">
                  <label for="processor" class="form-label">Procesador</label>
                  <input type="text" class="form-control" id="processor" placeholder="Ingrese el procesador">
                </div>
              </div>
            </div>
  
            <!-- Hard Drive Section -->
            <div class="col-md-6 mb-4">
              <h5 class="border-bottom pb-2">Disco Duro</h5>
              <div class="mb-3">
                <label for="hdCapacity" class="form-label">Capacidad</label>
                <input type="text" class="form-control" id="hdCapacity" placeholder="Ingrese la capacidad del disco duro">
              </div>
              <div class="mb-3">
                <label for="hdType" class="form-label">Tipo</label>
                <input type="text" class="form-control" id="hdType" placeholder="Ingrese el tipo de disco duro">
              </div>
              <div class="mb-3">
                <label for="hdBrand" class="form-label">Marca</label>
                <input type="text" class="form-control" id="hdBrand" placeholder="Ingrese la marca del disco duro">
              </div>
            </div>
  
            <!-- RAM Section -->
            <div class="col-md-6 mb-4">
              <h5 class="border-bottom pb-2">RAM</h5>
              <div class="mb-3">
                <label for="ramCapacity" class="form-label">Capacidad</label>
                <input type="text" class="form-control" id="ramCapacity" placeholder="Ingrese la capacidad de RAM">
              </div>
              <div class="mb-3">
                <label for="ramType" class="form-label">Tipo</label>
                <input type="text" class="form-control" id="ramType" placeholder="Ingrese el tipo de RAM">
              </div>
              <div class="mb-3">
                <label for="ramBrand" class="form-label">Marca</label>
                <input type="text" class="form-control" id="ramBrand" placeholder="Ingrese la marca de RAM">
              </div>
            </div>
          </div>
        </form>
      `,
      width: '80%',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        return {
          id: 0, // Generar un ID temporal o usar un servicio
          hardware: {
            cpu: (document.getElementById('cpu') as HTMLInputElement).value,
            monitor: (document.getElementById('monitor') as HTMLInputElement).value,
            keyboard: (document.getElementById('keyboard') as HTMLInputElement).value,
            mouse: (document.getElementById('mouse') as HTMLInputElement).value,
            isAllInOne: (document.getElementById('isAllInOne') as HTMLSelectElement).value === 'true',
            hasAOI: (document.getElementById('hasAOI') as HTMLSelectElement).value === 'true',
            isLaptop: (document.getElementById('isLaptop') as HTMLSelectElement).value === 'true',
            processor: (document.getElementById('processor') as HTMLInputElement).value
          },
          hardDrive: {
            capacity: (document.getElementById('hdCapacity') as HTMLInputElement).value,
            type: (document.getElementById('hdType') as HTMLInputElement).value,
            brand: (document.getElementById('hdBrand') as HTMLInputElement).value
          },
          ram: {
            capacity: (document.getElementById('ramCapacity') as HTMLInputElement).value,
            type: (document.getElementById('ramType') as HTMLInputElement).value,
            brand: (document.getElementById('ramBrand') as HTMLInputElement).value
          }
        };
      }
    });
  
    return formValues || null;
  }
}