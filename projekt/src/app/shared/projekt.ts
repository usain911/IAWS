import { Aufgaben } from './aufgaben';

export class Projekt {
    id: number;
    owner: number;
    name: string;
    bezeichnung: string;
    aufgaben: Aufgaben[];
}
