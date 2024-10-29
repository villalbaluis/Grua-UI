import { Hardware } from './hardware.interface';
import { HardDrive } from './hard-drive.interface';
import { Ram } from './ram.interface';

export interface Service {
  id: number;
  hardware: Hardware;
  hardDrive: HardDrive;
  ram: Ram;
}