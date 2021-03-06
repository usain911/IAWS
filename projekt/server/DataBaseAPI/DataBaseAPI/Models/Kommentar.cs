using System;
using System.Collections.Generic;

namespace DataBaseAPI.Models
{

  //beinhaltet alle Variablen aus der Tabelle Kommentar (Datenbank)
    public partial class Kommentar
    {
        public int KommentarId { get; set; }
        public int NutzerId { get; set; }
        public int AufgabenId { get; set; }
        public int? TeilaufgabenId { get; set; }
        public DateTime? Erstelldatum { get; set; }
        public string KommentarFeld { get; set; }
    }
}
