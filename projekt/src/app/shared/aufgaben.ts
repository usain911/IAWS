import { TeilAufgabe } from './teil-aufgabe';
import { Kommentar } from './kommentar';

export class Aufgaben {
    aufgabenId:number;
    titel?: string;
    beschreibung?: string;
    erstellerId?: number;
    projektId?: number;
    sollZeit?: number;
    istZeit?: number;
    erledigt?: boolean;
    erstellDdatum?: string;
    vorgaengerId?: number;
    nachfolgerId?: number;
    hasChanged?: boolean;
    teilaufgaben?: TeilAufgabe[];
    kommentar?: Kommentar[];
    deadline?: string;
    //deadlineD?: Date;
    //ueberzeit?: boolean;
}
