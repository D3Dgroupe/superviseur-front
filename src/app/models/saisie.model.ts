import { DataBlock } from "./datablock.model";
import { Device } from "./device.model";

export class Saisie {
    mode!: number;
    capteur!: Device;
    datablocs!: DataBlock[];
    option!: number;
}