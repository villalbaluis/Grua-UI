import { Injectable } from '@angular/core';
import { Service } from '../../domain/interfaces/service.interface';

@Injectable({
    providedIn: 'root'
})
export class ServiceManagementService {
    private services: Service[] = [
        {
            id: 1,
            hardware: {
                cpu: 'Intel Core i7',
                monitor: 'Dell 24" 1080p',
                keyboard: 'Logitech K120',
                mouse: 'Logitech M185',
                isAllInOne: false,
                hasAOI: false,
                isLaptop: false,
                processor: 'Intel Core i7-9700K'
            },
            hardDrive: {
                capacity: '1TB',
                type: 'SSD',
                brand: 'Samsung'
            },
            ram: {
                capacity: '16GB',
                type: 'DDR4',
                brand: 'Corsair'
            }
        }
    ];

    getAllServices(): Service[] {
        return this.services;
    }

    deleteServiceById(id: number): void {
        this.services = this.services.filter(service => service.id !== id);
    }

    updateService(updatedService: Service): void {
        const index = this.services.findIndex(s => s.id === updatedService.id);
        if (index !== -1) {
            this.services[index] = { ...updatedService };
        }
    }

    createService(newService: Service): void {
        const maxId = this.services.reduce((max, service) => (service.id > max ? service.id : max), 0);
        newService.id = maxId + 1;
        this.services.push(newService);
    }

    getServiceById(id: number): Service | undefined {
        return this.services.find(service => service.id === id);
    }
}