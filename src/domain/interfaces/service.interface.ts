export interface Service {
    id: number;
    hardware: {
      cpu: string;
      monitor: string;
      keyboard: string;
      mouse: string;
      isAllInOne: boolean;
      hasAOI: boolean;
      isLaptop: boolean;
      processor: string;
    };
    hardDrive: {
      capacity: string;
      type: string;
      brand: string;
    };
    ram: {
      capacity: string;
      type: string;
      brand: string;
    };
  }