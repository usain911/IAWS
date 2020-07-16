export class User {

    constructor(
        public nutzerId: number,
        public nutzername: string,
        public vorname: string,
        public nachname: string,
        public email: string,
        public passwort: string,
        public isAdmin: boolean,
        public team?: string,
        public position?: string,
        public mitgliedSeit?: string,
        public letzteAnmeldung?: string,
    ) {}
}
