export class Aufgaben {
    aufgabenId:number;
    titel?: string;
    beschreibung?: string;
    ersteller_id?: number;
    projekt_id?: number;
    soll_zeit?: string;
    ist_zeit?: string;
    erledigt?: boolean;
    erstell_datum?: string;
    vorgaenger_id?: number;
    nachfolger_id?: number;
}
