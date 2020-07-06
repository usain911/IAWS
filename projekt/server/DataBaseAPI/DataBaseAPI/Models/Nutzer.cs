using System;
using System.Collections.Generic;

namespace DataBaseAPI.Models
{
    public partial class Nutzer
    {
        public Nutzer()
        {
            NutzerAufgaben = new HashSet<NutzerAufgaben>();
            NutzerProjekte = new HashSet<NutzerProjekte>();
        }

        public int NutzerId { get; set; }
        public string Nutzername { get; set; }
        public string Vorname { get; set; }
        public string Nachname { get; set; }
        public string Email { get; set; }
        public string Passwort { get; set; }
        public bool? IsAdmin { get; set; }
        public string Team { get; set; }
        public string Position { get; set; }
        public DateTime? MitgliedSeit { get; set; }
        public string LetzteAnmeldung { get; set; }

        public virtual ICollection<NutzerAufgaben> NutzerAufgaben { get; set; }
        public virtual ICollection<NutzerProjekte> NutzerProjekte { get; set; }
    }
}
