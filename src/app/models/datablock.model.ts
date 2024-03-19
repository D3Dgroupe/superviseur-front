import { Time } from "@angular/common";

export class DataBlock {
    date!: string;
    year?: number;
    month?: number;
    day?: number;
    time?: Time;
    value?: number;
}