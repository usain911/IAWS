using System;
using System.Collections.Generic;

namespace DataBaseAPI.Models
{
    public partial class Teilaufgaben
    {
        public Teilaufgaben()
        {
            NutzerAufgaben = new HashSet<NutzerAufgaben>();
        }

        public int TeilaufgabenId { get; set; }
        public string Titel { get; set; }
        public string Beschreibung { get; set; }
        public int? ErstellerId { get; set; }
        public int Zugewiesen { get; set; }
        public bool? Erledigt { get; set; }
        public DateTime? ErstellDatum { get; set; }
        public int? ZugeordnetZuAufgabe { get; set; }
        public int? VorgaengerId { get; set; }
        public int? NachfolgerId { get; set; }
        public double? IstZeit { get; set; }
        public double? SollZeit { get; set; }
        public DateTime? Deadline { get; set; }

        public virtual ICollection<NutzerAufgaben> NutzerAufgaben { get; set; }
    }
}