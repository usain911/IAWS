export class NewUser {

    constructor(
        public nutzername: string,
        public vorname: string,
        public nachname: string,
        public email: string,
        public passwort: string,
        public isAdmin: boolean,
    ) {}
}
