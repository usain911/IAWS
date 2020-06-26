import { Aufgaben } from './aufgaben';

export class Projekt {
    projektId: number;
    projektOwnerId: number;
    name: string;
    bezeichnung: string;
    aufgaben: Aufgaben[];
    size?: number;
    tasksDone?: number;

    set setSize(val:number) {
        this.size=val;
    }
    set setTaksDone(val:number) {
        this.tasksDone=val;
    }
}

