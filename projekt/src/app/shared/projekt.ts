import { Aufgaben } from './aufgaben';
import { User } from './user';

export class Projekt {
    projektId: number;
    projektOwnerId: number;
    name: string;
    bezeichnung: string;
    aufgaben: Aufgaben[];
    size?: number;
    tasksDone?: number;
    user?: User;
    erledigt?: number;

    set setSize(val:number) {
        this.size=val;
    }
    set setTaksDone(val:number) {
        this.tasksDone=val;
    }
}

